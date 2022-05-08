import { Component } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  post: Post = new Post();

  constructor() {
    
  }

}
