import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/Comment';
import { Filters } from '../models/Filters';
import { Paginated } from '../models/Paginated';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    baseUrl = environment.baseUrl
    constructor(private http: HttpClient) { }

    index(filters: Filters, post_id: string): Observable<Paginated<Comment>> {
        const params = filters.toParams();
        return this.http.get<Paginated<Comment>>(`${this.baseUrl}/api/posts/${post_id}/comments`, { params })
    }
    
    post(post_id: string, text: string): Observable<Comment> {
        return this.http.post<Comment>(`${this.baseUrl}/api/posts/${post_id}/comments`, { text })
    }

    delete(post_id: string, comment_id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/posts/${post_id}/comments/${comment_id}`);
    }
}