import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap, switchMap, finalize } from 'rxjs/operators';
import { Filters } from 'src/app/models/Filters';
import { Paginated } from 'src/app/models/Paginated';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;

  loading: boolean = true;
  posts: Post[] = [];

  private filters$ = new BehaviorSubject(new Filters());
  private destroyed$ = new Subject<boolean>();

  constructor(
    private postService: PostService
  ) { }


  ionViewWillEnter(): void {

    this.filters$.pipe(
      takeUntil(this.destroyed$),
      tap(() => this.loading = true),
      switchMap(filters =>
        this.postService.index(filters)
          .pipe(finalize(() => this.loading = false))
      )
    ).subscribe(resp => this.loadPosts(resp))
  }

  loadPosts(resp: Paginated<Post>) {

    this.posts = this.posts.concat(resp.data);

    this.infiniteScroll.complete();
    this.infiniteScroll.disabled = !resp.next_page_url;
  }

  load() {
    if (this.loading) return;

    const filters = this.filters$.value;
    filters.page++;
    this.filters$.next(filters);
  }

  refresh() {
    const filters = new Filters({ page: 1 });
    this.posts = [];
    this.filters$.next(filters);
  }

  /* instead of OnDestroy */
  ionViewDidLeave() {
    this.filters$.complete();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
