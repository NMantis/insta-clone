import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PostService } from '../services/post.service';
import { Filters } from '../models/Filters';
import { Post } from '../models/Post';
import { Paginated } from '../models/Paginated';

@Injectable({
    providedIn: 'root'
})
export class HomePageResolver implements Resolve<Paginated<Post>> {
    constructor(protected postService: PostService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paginated<Post>> | Paginated<Post> {
        return this.postService.index(new Filters());
    }
}
