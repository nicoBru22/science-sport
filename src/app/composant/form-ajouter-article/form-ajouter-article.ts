import { Component, inject, signal } from '@angular/core';
import { ArticleService } from '../../service/articleService';
import { Router } from '@angular/router';
import { ARTICLE_RULES, Article, CategorieArticle } from '../../model/articleModel';
import { FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-ajouter-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-ajouter-article.html',
  styleUrls: ['./form-ajouter-article.scss'],
})
export class FormAjouterArticle {

  readonly articleService = inject(ArticleService);
  readonly router = inject(Router);
  readonly articleRules = signal(ARTICLE_RULES).asReadonly();
  readonly categories = Object.values(CategorieArticle);
  
  imagePreview = signal<string | null>(null);

  // Formulaire principal
  readonly form = new FormGroup({
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
    imageBase64: new FormControl('') // vignette
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
      const nouvelArticle = this.form.getRawValue() as unknown as Article;
      this.articleService.addArticle(nouvelArticle).subscribe({
        next: (articleCree) => {
          console.log('Article créé avec succès ! ID:', articleCree.id);
          this.router.navigate(['/blog']);
        },
        error: (err) => console.error('Erreur lors de la création :', err)
      });
    }
  }
}