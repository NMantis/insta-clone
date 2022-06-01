import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filters } from '../models/Filters';
import { FollowReqStatus, FollowRequest } from '../models/FollowRequest';
import { Paginated } from '../models/Paginated';

@Injectable({
    providedIn: 'root'
})
export class FollowReuqestService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    pending(filters: Filters): Observable<Paginated<FollowRequest>> {
        const params = filters.toParams();
        return this.http.get<Paginated<FollowRequest>>(`${this.baseUrl}/api/follow-requests/pending`, { params });
    }
    
    follow(fr_id: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/api/follow-requests`, {});
    }

    unfollow(fr_id: string): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/api/follow-requests/${fr_id}`, { status: FollowReqStatus.REJECTED });
    }
}