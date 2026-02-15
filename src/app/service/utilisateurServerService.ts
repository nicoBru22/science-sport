import { inject, Injectable } from "@angular/core";
import { UserService } from "./userService"; // Ton interface
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/userModel";

@Injectable({
    providedIn: 'root' // Indispensable pour que le service soit disponible partout
})
export class UserServerService implements UserService {
    private readonly http = inject(HttpClient);
    
    private readonly AUTH_API_URL = "http://localhost:8080/api/auth";

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.AUTH_API_URL}/register`, user);
    }

    login(credentials: User): Observable<any> {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        return this.http.post("http://localhost:8080/login", formData, {
            withCredentials: true
        });
    }
}