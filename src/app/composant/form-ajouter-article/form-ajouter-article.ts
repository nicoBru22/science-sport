import { Component, inject, signal } from '@angular/core';
import { ArticleService } from '../../service/articleService';
import { Router } from '@angular/router';
import { ARTICLE_RULES } from '../../model/articleModel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    
    // Sections Introduction
    stIntroArticle: new FormControl('', { nonNullable: true }),
    texteIntroArticle: new FormControl('', { nonNullable: true }),
    
    // Sections de corps (1, 2, 3)
    st1Article: new FormControl('', { nonNullable: true }),
    texte1Article: new FormControl('', { nonNullable: true }),
    
    st2Article: new FormControl('', { nonNullable: true }),
    texte2Article: new FormControl('', { nonNullable: true }),
    
    st3Article: new FormControl('', { nonNullable: true }),
    texte3Article: new FormControl('', { nonNullable: true }),
    
    // Conclusion
    stConclusionArticle: new FormControl('', { nonNullable: true }),
    texteConclusionArticle: new FormControl('', { nonNullable: true }),
    
    imageUrl: new FormControl('') // Optionnel
  });

  onSubmit() {
    if (this.form.valid) {
      const nouvelArticle = this.form.getRawValue();
      
      this.articleService.addArticle(nouvelArticle).subscribe({
        next: () => {
          console.log('Article créé avec succès !');
          this.router.navigate(['/blog']);
        },
        error: (err) => console.error('Erreur lors de la création :', err)
      });
    }
  }
}
