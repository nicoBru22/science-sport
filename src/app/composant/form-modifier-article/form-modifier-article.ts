import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article, ARTICLE_RULES, CategorieArticle } from '../../model/articleModel';
import { ArticleService } from '../../service/articleService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modifier-article',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-modifier-article.html',
  styleUrl: './form-modifier-article.scss',
})
export class FormModifierArticle {

  readonly route = inject(ActivatedRoute);
  readonly articleService = inject(ArticleService);
  readonly router = inject(Router);
  readonly articleRules = signal(ARTICLE_RULES).asReadonly();
  readonly categories = Object.values(CategorieArticle);
  existingArticle!: Article; // déclaration
  
  imagePreview = signal<string | null>(null);

  // Formulaire principal
  readonly form = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    titre: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(this.articleRules().MIN_TITRE),
        Validators.maxLength(this.articleRules().MAX_TITRE),
        Validators.pattern(this.articleRules().PATTERN)
      ]
    }),
    categorie: new FormControl('', { nonNullable: true, validators: [Validators.required] }),

    introduction: new FormGroup({
      sousTitre: new FormControl('', { nonNullable: true }),
      texte: new FormControl('', { nonNullable: true }),
    }),

    sections: new FormArray([]), // sections dynamiques
    conclusion: new FormGroup({
      sousTitre: new FormControl('', { nonNullable: true }),
      texte: new FormControl('', { nonNullable: true }),
    }),

    references: new FormArray([]), // références dynamiques

    lienArticle: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.pattern(/https?:\/\/.+/)] // validation URL simple
    }),
    
    imageBase64: new FormControl('')
  });

  // Getters
  get introduction(): FormGroup { return this.form.get('introduction') as FormGroup; }
  get sections(): FormArray { return this.form.get('sections') as FormArray; }
  get conclusion(): FormGroup { return this.form.get('conclusion') as FormGroup; }
  get references(): FormArray { return this.form.get('references') as FormArray; }
  // TS
  get sectionFormGroups(): FormGroup[] {
    return this.sections.controls.map(ctrl => ctrl as FormGroup);
  }
  get referenceFormControls(): FormControl[] {
    return this.references.controls.map(ctrl => ctrl as FormControl);
  }

  // Sections dynamiques
  addSection() {
    this.sections.push(new FormGroup({
      sousTitre: new FormControl('', { nonNullable: true }),
      texte: new FormControl('', { nonNullable: true })
    }));
  }
  removeSection(index: number) { this.sections.removeAt(index); }

  // Références dynamiques
  addReference() {
    this.references.push(new FormControl('', { nonNullable: true }));
  }
  removeReference(index: number) { this.references.removeAt(index); }

  // Image
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 1024 * 1024) {
        alert("L'image est trop volumineuse (max 1Mo)");
        input.value = '';
        this.imagePreview.set(null);
        this.form.patchValue({ imageBase64: '' });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imagePreview.set(base64);
        this.form.patchValue({ imageBase64: base64 });
      };
      reader.readAsDataURL(file);
    }
  }

  // Soumission
  onSubmit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      // Cast "brut" vers Article pour contourner la vérification des dates
      const articleModifie = raw as unknown as Article;

      this.articleService.updateArticle(articleModifie).subscribe({
        next: () => {
          console.log('Article modifié avec succès !');
          this.router.navigate(['/blog']);
        },
        error: (err) => console.error('Erreur lors de la modification :', err)
      });
    }
  }

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.articleService.getArticleById(id).subscribe(article => {

      // Remplit les champs simples
      this.form.patchValue({
        id: article.id,
        titre: article.titre,
        categorie: article.categorie,
        introduction: article.introduction,
        conclusion: article.conclusion,
        lienArticle: article.lienArticle,
        imageBase64: article.imageBase64
      });

      // Sections
      article.sections?.forEach(section => {
        this.sections.push(new FormGroup({
          sousTitre: new FormControl(section.sousTitre, { nonNullable: true }),
          texte: new FormControl(section.texte, { nonNullable: true })
        }));
      });

      // Références
      article.references?.forEach(ref => {
        this.references.push(new FormControl(ref, { nonNullable: true }));
      });

      if (article.imageBase64) {
        this.imagePreview.set(article.imageBase64);
      }
    });
  }
}
}
