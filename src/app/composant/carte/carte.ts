import { Component, inject } from '@angular/core';
import { ArticleService } from '../../service/articleService';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-carte',
  imports: [RouterLink],
  templateUrl: './carte.html',
  styleUrl: './carte.scss',
})
export class Carte {
  readonly #articleService = inject(ArticleService);
  readonly articleList = toSignal(this.#articleService.getArticleList(), {initialValue: []})
}
