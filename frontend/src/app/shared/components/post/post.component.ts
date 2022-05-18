import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Post } from "src/app/models/Post";
import { AuthService } from "src/app/services/auth.service";
import { LikeService } from "src/app/services/like.service";
import { CommentModalComponent } from "./comment-modal/comment-modal.component";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;

  @Output()
  refresh = new EventEmitter();

  constructor(
    private modal: ModalController,
    private likeService: LikeService,
    private auth: AuthService
  ) { }

  ngOnInit() { }

  like() {
    this.likeService.like(this.post.id)
      .subscribe(post => this.post = new Post(post));
  }

  unlike() {
    this.likeService.unlike(this.post.id)
      .subscribe(() => {
        this.post.liked_by_auth_user = false;

        const index = this.post
          .post_likes
          .findIndex(like => like.user_id == this.auth.user.id);

        this.post.post_likes.splice(index, 1);
      })
  }

  async showModal() {
    const modal = await this.modal.create({
      component: CommentModalComponent,
      cssClass: "comment-modal",
      componentProps: {
        post: this.post,
      },
    });

    await modal.present();

    await modal.onWillDismiss().then((resp) => {
      if (resp.data) this.refresh.emit();
    });
  }
}
