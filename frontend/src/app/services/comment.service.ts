import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    baseUrl = environment.baseUrl
    constructor(private http: HttpClient) { }

    store(post_id: string, comment: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/posts${post_id}/comments`, comment)
    }

    delete(post_id: string, comment_id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/api/posts${post_id}/comments/${comment_id}`);
    }
}