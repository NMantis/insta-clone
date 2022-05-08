import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Filters } from '../models/Filters';
import { Paginated } from '../models/Paginated';
import { Post } from '../models/Post';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }

    index(filters: Filters): Observable<Paginated<Post>> {
        const params = filters.toParams();
        return this.http.get<Paginated<Post>>(`${this.baseUrl}/api/posts`, { params })
        .pipe(map(resp => {
            resp.data = resp.data.map(post => new Post(post));
            return resp;
        }))
    }

    profile(filters: Filters): Observable<Paginated<any>> {
        const params = filters.toParams();
        return this.http.get<{ posts: Paginated<any> }>(`${this.baseUrl}/api/posts/profile`, { params })
            .pipe(map(resp => resp.posts))
    }

    store(post: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/posts`, post)
    }

    delete(post_id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/posts/${post_id}`);
    }
}