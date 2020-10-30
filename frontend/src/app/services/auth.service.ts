import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl
  public token = new BehaviorSubject<string>(null);
 // public user = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const saved_token = localStorage.getItem('token');
    if (saved_token) {
        this.token.next(saved_token);
    }

    this.token.subscribe(token => localStorage.setItem('token', token) );
  }

  login(email: string, password: string): Observable<{ user: any, access_token: string }> {
    return this.http
      .post<{ user, access_token }>(`${this.baseUrl}/api/login`, { email, password })
      .pipe(
        tap(resp => this.token.next(resp.access_token))
      );
  }

  logout(): void {
    this.token.next(null);
    this.router.navigate(['/', 'auth', 'login'])
  }

  status(): Observable<boolean> {
    return this.token.pipe(map(token => token != null && token != 'null'));
  }

}
