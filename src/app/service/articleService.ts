import { Observable } from "rxjs"
import { Article } from "../model/articleModel"

export abstract class ArticleService {
    abstract getArticleList(): Observable<Article[]>;
    abstract getArticleById(id: string): Observable<Article>;
    abstract addArticle(article: Article): Observable<Article>;
    abstract deleteArticle(id: string): Observable<void>;
    abstract getthreeLastArticles(): Observable<Article[]>;
    abstract updateArticle(article: Article): Observable<Article>;
    abstract getListArticleByWithWord(word: string): Observable<Article[]>;
    abstract getListArticleFiteredByCategorie(categorie: string): Observable<Article[]>;
}