import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Filters } from 'src/app/models/Filters';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.data
      .pipe(first())
      .subscribe(({ posts }) => this.posts = posts.data);
  }

}
