import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { User } from "../model/userModel";
import { UserService } from "./userService"; // Ton interface

@Injectable({
  providedIn: 'root'
})
export class UserServerService implements UserService {
  private readonly http = inject(HttpClient);
  private readonly AUTH_API_URL = "http://architectural-ailina-sportscience-46093043.koyeb.app/api/auth";

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

    setLoggedIn(status: boolean) {
        this.loggedInSubject.next(status);
    }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.AUTH_API_URL}/register`, user);
  }

    // Dans UserServerService
    login(credentials: User): Observable<any> {
        return this.http.post(`${this.AUTH_API_URL}/login`, credentials, { withCredentials: true })
            .pipe(
                tap(() => {
                    console.log("Service: Mise à jour du statut à TRUE");
                    this.loggedInSubject.next(true);
                })
            );
    }

    logout(): Observable<any> {
        return this.http.post(`${this.AUTH_API_URL}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => this.loggedInSubject.next(false)) // <-- On signale qu'on est déconnecté
        );
    }

    getMe() {
    return this.http.get<User>(`${this.AUTH_API_URL}/me`, { withCredentials: true }).pipe(
        tap(user => {
        console.log("[UserService] /me SUCCESS :", user);
        this.loggedInSubject.next(true); // Connexion confirmée
        }),
        catchError(err => {
        // Si c'est une 401 ou 403, on est vraiment déconnecté
        if (err.status === 401 || err.status === 403) {
            console.warn("[UserService] Session expirée ou inexistante");
            this.loggedInSubject.next(false);
        } else if (err.status === 200) {
            // C'est un succès de session, mais une erreur de lecture JSON
            console.log("[UserService] Session OK (mais erreur parsing)");
            this.loggedInSubject.next(true);
        }
        return throwError(() => err);
        })
    );
    }

    isLoggedIn(): boolean {
        return this.loggedInSubject.getValue();
    }
}