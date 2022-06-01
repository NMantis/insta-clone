import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { startWith, takeUntil, tap, switchMap, finalize } from 'rxjs/operators';
import { Filters } from 'src/app/models/Filters';
import { FollowRequest } from 'src/app/models/FollowRequest';
import { Paginated } from 'src/app/models/Paginated';
import { FollowReuqestService } from 'src/app/services/follow-request.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage  {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;
  
  loading: boolean;
  fRequests: FollowRequest[] = [];

  private filters$ = new BehaviorSubject(new Filters());
  private destroyed$ = new Subject<boolean>();
  
  constructor(
    private followRequestService: FollowReuqestService
  ) { }

    ionViewDidEnter() {
      this.filters$.pipe(
        startWith(this.filters$.value),
        takeUntil(this.destroyed$),
        tap(() => this.loading = true),
        switchMap(filters =>
          this.followRequestService.pending(filters)
            .pipe(finalize(() => this.loading = false))
        )
      ).subscribe(resp => this.loadFollowRequests(resp))
    } 


    loadFollowRequests(resp: Paginated<FollowRequest>) {

      this.fRequests = this.fRequests.concat(resp.data);
  
      this.infiniteScroll.complete();
      this.infiniteScroll.disabled = !resp.next_page_url;
    }
  
    load() {
      if (this.loading) return;
  
      const filters = this.filters$.value;
      filters.page++;
      this.filters$.next(filters);
    }


    ionViewDidLeave() {
      this.filters$.complete();
      this.destroyed$.next(true);
      this.destroyed$.complete();
    }
}
