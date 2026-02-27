import { Observable } from "rxjs";
import { User } from "../model/userModel";

export abstract class UserService {
    abstract register(user: User): Observable<User>;
    abstract login(credentials: User): Observable<any>;
    abstract getMe(): Observable<User>;
    abstract logout(): Observable<any>;
    abstract isLoggedIn(): boolean;
    abstract loggedIn$: Observable<boolean>;

}