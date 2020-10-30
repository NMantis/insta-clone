import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  baseUrl = environment.baseUrl;
  private destroyed$ = new Subject<boolean>();
  public profile_segment: string;

  // You can get this data from your API. This is a dumb data for being an example.
  public images = [
    {
      id: 1,
      username: 'candelibas',
      profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
      post_img: 'https://scontent-cdg2-1.cdninstagram.com/t51.2885-15/e35/13473123_1544898359150795_654626889_n.jpg'
    }
  ];

  constructor(private route: ActivatedRoute) {
  }

  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.profile_segment = 'grid';
    this.route.data
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({ posts }) => console.log(posts))
  }

  ionViewDidLeave() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
