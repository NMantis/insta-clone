import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { BehaviorSubject, Subject } from "rxjs";
import { first, tap, auditTime, takeUntil, switchMap, finalize } from "rxjs/operators";
import { Filters } from "src/app/models/Filters";
import { Paginated } from "src/app/models/Paginated";
import { Post } from "src/app/models/Post";
import { ProfileData } from "src/app/models/ProfileData";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { ProfileService } from "src/app/services/profile.service";
import { environment } from "src/environments/environment";
import { FollowerModalComponent } from "../follower-modal/follower-modal.component";

@Component({
  selector: 'profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
})
export class ProfileLayoutComponent implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;

  @Input()
  profileData: ProfileData;

  posts: any[] = [];
  postsBackup: any[] = [];
  loading: boolean;
  shadowText = [];
  filters$: BehaviorSubject<Filters>;
  baseUrl = environment.baseUrl;
  profile_segment: string = "grid";

  private destroyed$ = new Subject<boolean>();


  constructor(
    private postService: PostService,
    private modal: ModalController,
    private auth: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.filters$ = new BehaviorSubject<Filters>(new Filters());
    if (this.infiniteScroll?.disabled) {
      this.infiniteScroll.disabled = false;
    }


    this.filters$
      .pipe(
        tap(() => (this.loading = true)),
        auditTime(400),
        takeUntil(this.destroyed$),
        switchMap((filters) =>
          this.postService.profile(filters).pipe(finalize(() => (this.loading = false)))
        )
      )
      .subscribe((resp) => this.loadPosts(resp));
  }


  loadPosts(response: Paginated<any>) {
    if (this.filters$.value.query?.length || this.filters$.value.query === "") {
      this.posts = response.data;
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
    if (!this.posts.length) return;

    const filters = this.filters$.value;
    filters.page++;
    this.filters$.next(filters);
  }


  presentModal(src: 'followers' | 'following') {

    let obs;
    if (src == 'followers') {
      obs = this.profileService.followers();
    } else {
      obs = this.profileService.following();
    }

    obs.subscribe(async users => {

      const modal = await this.modal.create({
        component: FollowerModalComponent,
        cssClass: 'follower-modal',
        componentProps: {
          users: users,
          title: src
        }
      })

      await modal.present();
    });

  }

  ngOnDestroy() {
    this.posts = [];
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
