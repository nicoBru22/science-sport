import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../service/articleService';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-section-last-articles',
  imports: [RouterLink],
  templateUrl: './section-last-articles.html',
  styleUrl: './section-last-articles.scss',
})
export class SectionLastArticles {
  readonly #articleService = inject(ArticleService);
  readonly threeLastArticle = toSignal(this.#articleService.getthreeLastArticles(), {initialValue: []})
}
