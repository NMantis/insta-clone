import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { FollowReuqestService } from 'src/app/services/follow-request.service';

@Component({
  selector: 'app-follower-modal',
  templateUrl: './follower-modal.component.html',
  styleUrls: ['./follower-modal.component.scss'],
})
export class FollowerModalComponent implements OnInit {

  @Input()
  users: User[];

  @Input()
  title: string;

  constructor(
    private modal: ModalController,
    private followRequestService: FollowReuqestService
  ) { }

  ngOnInit() { }

  dismiss() {
    this.modal.dismiss()
      .catch(err => console.log(err));
  }


  remove(user: User) {
    // this.followRequestService.unfollow().subscribe();
  }

  follow(user: User) {
    // this.followRequestService.follow().subscribe();
  }
}
