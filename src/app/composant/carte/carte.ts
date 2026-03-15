import { Component, inject, signal, computed } from '@angular/core';
import { ArticleService } from '../../service/articleService';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Article } from '../../model/articleModel';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './carte.html',
  styleUrls: ['./carte.scss'],
})
export class Carte {
  readonly #articleService = inject(ArticleService);

  // Liste complète des articles (tous les articles pour fallback)
  readonly articleList = signal<Article[]>([]);

  // Signal pour le mot recherché
  motRecherche = signal('');

  // Toutes les catégories possibles
  categories = ['Physiologie', 'Entraînement', 'Biomécanique', 'Nutrition', 'Psychologie'];

  // Signal pour les catégories sélectionnées
  selectedCategories = signal<string[]>([]);

  // Liste filtrée combinant mot et catégories
  filteredArticles = signal<Article[]>([]);

  constructor() {
    // Charger tous les articles au départ
    this.#articleService.getArticleList().subscribe(res => {
      this.articleList.set(res);
      this.filteredArticles.set(res); // initialement tous les articles
    });
  }

  // Gestion des checkbox
  toggleCategorie(cat: string, checked: boolean) {
    const current = this.selectedCategories();
    if (checked) {
      this.selectedCategories.set([...current, cat]);
    } else {
      this.selectedCategories.set(current.filter(c => c !== cat));
    }

    this.filtrerArticles();
  }

  // Filtrage combiné mot + catégories
  filtrerArticles() {
    const mot = this.motRecherche().trim();
    const cats = this.selectedCategories();

    if (mot && cats.length > 0) {
      // mot + catégorie -> appel backend pour le mot et filtrage côté frontend pour les catégories
      this.#articleService.getListArticleByWithWord(mot).subscribe(res => {
        const filtered = res.filter(a => cats.includes(a.categorie));
        this.filteredArticles.set(filtered);
      });
    } else if (mot) {
      // mot uniquement
      this.#articleService.getListArticleByWithWord(mot).subscribe(res => {
        this.filteredArticles.set(res);
      });
    } else if (cats.length === 1) {
      // une seule catégorie -> appel backend pour filtrage par catégorie
      this.#articleService.getListArticleFiteredByCategorie(cats[0]).subscribe(res => {
        this.filteredArticles.set(res);
      });
    } else if (cats.length > 1) {
      // plusieurs catégories -> on récupère tous et on filtre côté frontend
      this.#articleService.getArticleList().subscribe(res => {
        const filtered = res.filter(a => cats.includes(a.categorie));
        this.filteredArticles.set(filtered);
      });
    } else {
      // aucun filtre -> afficher tous
      this.filteredArticles.set(this.articleList());
    }
  }

  // Filtrage lors de la saisie du mot
  rechercherMot() {
    this.filtrerArticles();
  }
}