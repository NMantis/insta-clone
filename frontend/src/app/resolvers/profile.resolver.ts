import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PostService } from '../services/post.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {
    constructor(protected postService: PostService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.postService.profile();
    }
}
