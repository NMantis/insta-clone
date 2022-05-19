import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/User';

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
  
  constructor(private modal: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modal.dismiss()
      .catch(err => console.log(err));
  }

}
