import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleService } from '../../service/articleService';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class Article {
  readonly #route = inject(ActivatedRoute);
  readonly articleId = this.#route.snapshot.paramMap.get('id')!;
  readonly #articleService = inject(ArticleService);
  readonly #articleReponse = toSignal(this.#articleService.getArticleById(this.articleId).pipe(
    map((article) => ({value: article, error : undefined})),
    catchError((error) => of({value: undefined, error}))
  ));

  readonly error = computed(() => this.#articleReponse()?.error);
  readonly article = computed(() => this.#articleReponse()?.value);
}
