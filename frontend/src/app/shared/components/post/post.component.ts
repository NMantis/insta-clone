import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/app/models/Post';
import { CommentModalComponent } from './comment-modal/comment-modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input()
  post: Post;

  @Output()
  refresh = new EventEmitter();

  constructor(private modal: ModalController) { }

  ngOnInit() { }


  async showModal() {
    const modal = await this.modal.create({
      component: CommentModalComponent,
      cssClass: 'comment-modal',
      componentProps: {
        post: this.post
      }
    });

    await modal.present();

    await modal.onWillDismiss().then(resp => {
      if (resp.data)
        this.refresh.emit();
    })
  }

}
