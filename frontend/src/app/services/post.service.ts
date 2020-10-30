import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filters } from '../models/Filters.model';
import { Paginated } from '../models/Paginated.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }

    index(filters: Filters): Observable<Paginated<any>> {
        const params = filters.toParams();
        return this.http.get<Paginated<any>>(`${this.baseUrl}/api/posts`, { params })
    }

    profile(): Observable<Paginated<any>> {
        return this.http.get<Paginated<any>>(`${this.baseUrl}/api/posts/profile`)
    }
    
    store(post: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/posts`, post)
    }

    delete(post_id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/posts/${post_id}`);
    }
}