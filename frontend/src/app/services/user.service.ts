import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    current(): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/api/current`);
    }
    
}