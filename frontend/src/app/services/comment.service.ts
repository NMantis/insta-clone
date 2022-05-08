import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filters } from '../models/Filters';
import { Paginated } from '../models/Paginated';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    baseUrl = environment.baseUrl
    constructor(private http: HttpClient) { }

    index(filters: Filters, post_id: string): Observable<Paginated<any>> {
        const params = filters.toParams();
        return this.http.get<Paginated<any>>(`${this.baseUrl}/api/posts/${post_id}/comments`, { params })
    }
    
    store(post_id: string, comment: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/posts/${post_id}/comments`, comment)
    }

    delete(post_id: string, comment_id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/posts/${post_id}/comments/${comment_id}`);
    }
}