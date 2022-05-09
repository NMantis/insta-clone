import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProfileData } from '../models/ProfileData';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    baseUrl = environment.baseUrl
    constructor(private http: HttpClient) { }

    load(user_id: string): Observable<ProfileData> {
        return this.http.get<ProfileData>(`${this.baseUrl}/api/profile/${user_id}`)
        .pipe(map(resp => new ProfileData(resp)))
    }
    
}