import { inject, Injectable } from "@angular/core";
import { ArticleService } from "./articleService";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Article } from "../model/articleModel";

@Injectable({providedIn: 'root'})

export class ArticleJsonServerService implements ArticleService {
    private readonly http = inject(HttpClient);
    private readonly Article_API_URL = "http://localhost:3000/articles";

    getArticleList(): Observable<Article[]> {
        return this.http.get<Article[]>(this.Article_API_URL);
        
    }

    getArticleById(id: string): Observable<Article> {
        return this.http.get<Article>(`${this.Article_API_URL}/${id}`);
    }

    addArticle(article: Article): Observable<Article> {
        return this.http.post<Article>(this.Article_API_URL, article)
    }

    deleteArticle(id: string): Observable<void> {
        return this.http.delete<void>(`${this.Article_API_URL}/${id}`);
    }
}