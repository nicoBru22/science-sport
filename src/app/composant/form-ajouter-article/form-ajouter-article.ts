import { Component, inject, signal } from '@angular/core';
import { ArticleService } from '../../service/articleService';
import { Router } from '@angular/router';
import { ARTICLE_RULES } from '../../model/articleModel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from '../../model/articleModel';

@Component({
  selector: 'app-form-ajouter-article',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-ajouter-article.html',
  styleUrl: './form-ajouter-article.scss',
})
export class FormAjouterArticle {

  readonly articleService = inject(ArticleService);
  readonly router = inject(Router);
  readonly articleRules = signal(ARTICLE_RULES).asReadonly();
  
  // Signal pour la prévisualisation de l'image
  imagePreview = signal<string | null>(null);

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
    stIntroArticle: new FormControl('', { nonNullable: true }),
    texteIntroArticle: new FormControl('', { nonNullable: true }),
    st1Article: new FormControl('', { nonNullable: true }),
    texte1Article: new FormControl('', { nonNullable: true }),
    st2Article: new FormControl('', { nonNullable: true }),
    texte2Article: new FormControl('', { nonNullable: true }),
    st3Article: new FormControl('', { nonNullable: true }),
    texte3Article: new FormControl('', { nonNullable: true }),
    stConclusionArticle: new FormControl('', { nonNullable: true }),
    texteConclusionArticle: new FormControl('', { nonNullable: true }),
    imageBase64: new FormControl('') // Contiendra la chaîne Base64
  });

  // Méthode pour capturer et convertir l'image
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Sécurité : Max 1Mo pour une vignette
      if (file.size > 1024 * 1024) {
        alert("L'image est trop volumineuse (max 1Mo)");
        input.value = ''; // Reset l'input
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imagePreview.set(base64); // Pour l'affichage local
        this.form.patchValue({ imageBase64: base64 }); // Pour l'envoi au serveur
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // getRawValue() récupère tout, y compris l'imageUrl en Base64
      const nouvelArticle = this.form.getRawValue() as Article;
      
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