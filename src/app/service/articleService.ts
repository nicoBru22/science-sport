import { Observable } from "rxjs"
import { Article } from "../model/articleModel"

export abstract class ArticleService {
    abstract getArticleList(): Observable<Article[]>;
    abstract getArticleById(id: string): Observable<Article>;
    abstract addArticle(article: Article): Observable<Article>;
}