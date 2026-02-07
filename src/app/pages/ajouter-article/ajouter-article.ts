import { Component } from '@angular/core';
import { FormAjouterArticle } from "../../composant/form-ajouter-article/form-ajouter-article";

@Component({
  selector: 'app-ajouter-article',
  standalone: true,
  imports: [FormAjouterArticle],
  templateUrl: './ajouter-article.html',
  styleUrl: './ajouter-article.scss',
})
export class AjouterArticle {

}
