import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/User";
import { AuthData, AutorizedResponse } from "../models/AuthData";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.baseUrl;
  public token$ = new BehaviorSubject<string>(null);
  public user$ = new BehaviorSubject<User>(null);

  constructor(private router: Router, private http: HttpClient) {
    const saved_token = localStorage.getItem("token");
    if (saved_token) {
      this.token$.next(saved_token);
    }

    this.token$.subscribe((token) => localStorage.setItem("token", token));
  }

  login(email: string, password: string): Observable<AutorizedResponse> {
    return this.http
      .post<{ user; access_token }>(`${this.baseUrl}/api/login`, {
        email,
        password,
      })
      .pipe(
        tap((resp) => this.token$.next(resp.access_token)),
        tap((resp) => this.setUser(resp.user))
      );
  }

  register(data: AuthData): Observable<AutorizedResponse> {
    return this.http
      .post<{ user; access_token }>(`${this.baseUrl}/api/register`, data )
      .pipe(
        tap((resp) => this.token$.next(resp.access_token)),
        tap((resp) => this.setUser(resp.user))
      );
  }

  logout(): void {
    this.token$.next(null);
    this.router.navigate(["/", "auth", "login"]);
  }

  setUser(user: User) {
    const usr = new User(user);
    this.user$.next(usr);
  }

  get user(): User {
    return this.user$.value;
  }

  status(): Observable<boolean> {
    return this.token$.pipe(map((token) => token != null && token != "null"));
  }
}
