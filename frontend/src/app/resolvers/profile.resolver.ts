import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {
    constructor(protected profileService: ProfileService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        const { username } = route.params;

        return this.profileService.load(username);
    }
}
