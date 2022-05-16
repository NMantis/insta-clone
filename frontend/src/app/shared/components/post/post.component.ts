import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Post } from "src/app/models/Post";
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
    private likeService: LikeService
  ) {}

  ngOnInit() {}

  update() {

    let temp = this.post.liked_by_auth_user;


    let obs;
    if (this.post.liked_by_auth_user) {
      obs = this.likeService.unlike(this.post.id);
    } else {
      obs = this.likeService.like(this.post.id);
    }
    
    this.post.liked_by_auth_user = !temp;

    obs.subscribe(post => this.post = new Post(post));
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
