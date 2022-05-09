import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { auditTime, finalize, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Filters } from 'src/app/models/Filters';
import { Paginated } from 'src/app/models/Paginated';
import { ProfileData } from 'src/app/models/ProfileData';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  posts: any[] = [];
  postsBackup: any[] = [];
  loading: boolean;
  shadowText = [];
  filters$: BehaviorSubject<Filters>;
  baseUrl = environment.baseUrl;
  profile_segment: string = 'grid';
  profileData: ProfileData;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private postService: PostService,
    private modal: ModalController,
    private route: ActivatedRoute
    ) { }

  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.filters$ = new BehaviorSubject<Filters>(new Filters())
    if (this.infiniteScroll.disabled) {
      this.infiniteScroll.disabled = false
    }

    this.route.data
      .pipe(first())
      .subscribe(({ data }) => this.profileData = data);

      this.filters$.pipe(
        tap(() => this.loading = true),
        auditTime(400),
        takeUntil(this.destroyed$),
        switchMap(filters =>
          this.postService.profile(filters)
            .pipe(finalize(() => this.loading = false)))
      ).subscribe(resp => this.loadPosts(resp));
  }

  loadPosts(response: Paginated<any>) {
    if (this.filters$.value.query?.length || this.filters$.value.query === '') {
      this.posts = response.data
    } else {
      this.posts = this.posts.concat(response.data);
      this.postsBackup = this.posts.slice();
    }

    this.infiniteScroll.complete();

    if (!response.next_page_url) {
      this.infiniteScroll.disabled = true;
    }
  }

  load() {
    if(! this.posts.length) return ;

    const filters = this.filters$.value
    filters.page++
    this.filters$.next(filters)
  }

  ionViewDidLeave() {
    this.posts = [];
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
