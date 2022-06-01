import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FollowReqStatus } from '../models/FollowRequest';

@Injectable({
    providedIn: 'root'
})
export class FollowReuqestService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    // index(filters: Filters, post_id: string): Observable<Paginated<Comment>> {
    //     const params = filters.toParams();
    //     return this.http.get<Paginated<Comment>>(`${this.baseUrl}/api/posts/${post_id}/comments`, { params })
    // }
    
    follow(fr_id: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/follow-requests`, {});
    }

    unfollow(fr_id: string): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/api/follow-requests/${fr_id}`, { status: FollowReqStatus.REJECTED });
    }
}