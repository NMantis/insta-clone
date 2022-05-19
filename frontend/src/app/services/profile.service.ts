import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProfileData } from '../models/ProfileData';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    baseUrl = environment.baseUrl
    constructor(private http: HttpClient) { }

    load(username: string): Observable<ProfileData> {
        return this.http.get<ProfileData>(`${this.baseUrl}/api/profile/${username}`)
            .pipe(map(resp => new ProfileData(resp)))
    }

    followers(): Observable<User[]> {
        return this.http.get<{ data: User[] }>(`${this.baseUrl}/api/profile/followers`)
            .pipe(map(resp => resp.data));
    }

    following(): Observable<User[]> {
        return this.http.get<{ data: User[] }>(`${this.baseUrl}/api/profile/following`)
            .pipe(map(resp => resp.data));
    }

}