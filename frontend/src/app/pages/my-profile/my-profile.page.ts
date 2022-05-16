import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, IonInfiniteScroll, ModalController } from "@ionic/angular";
import { BehaviorSubject, Subject } from "rxjs";
import { first, tap, auditTime, takeUntil, switchMap, finalize } from "rxjs/operators";
import { Filters } from "src/app/models/Filters";
import { Paginated } from "src/app/models/Paginated";
import { ProfileData } from "src/app/models/ProfileData";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.page.html",
  styleUrls: ["./my-profile.page.scss"],
})
export class MyProfilePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  posts: any[] = [];
  postsBackup: any[] = [];
  loading: boolean;
  shadowText = [];
  filters$: BehaviorSubject<Filters>;
  baseUrl = environment.baseUrl;
  profile_segment: string = "grid";
  profileData: ProfileData;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private postService: PostService,
    private modal: ModalController,
    private route: ActivatedRoute,
    private alert: AlertController,
    private auth: AuthService
  ) {}

  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.filters$ = new BehaviorSubject<Filters>(new Filters());
    if (this.infiniteScroll.disabled) {
      this.infiniteScroll.disabled = false;
    }

    this.route.data.pipe(first()).subscribe(({ data }) => (this.profileData = data));

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

  async logout() {
    const alert = await this.alert.create({
      header: "Logout",
      message: "Are you sure you wish to logout?",
      buttons: [
        {
          text: "NO",
          role: "cancel",
        },
        {
          text: "YES",
          handler: () => {
            this.auth.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewDidLeave() {
    this.posts = [];
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
