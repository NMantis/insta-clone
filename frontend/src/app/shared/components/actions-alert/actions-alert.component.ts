import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';

@Component({
  selector: 'actions-alert-button',
  templateUrl: './actions-alert.component.html',
  styleUrls: ['./actions-alert.component.scss'],
})
export class ActionsAlertComponent implements OnInit {

  constructor(
    private actionSheet: ActionSheetController
  ) { }

  ngOnInit() { }

  async presentActionSheet() {
    const isFollowing = true;
    const isPost = true;
    const buttons: ActionSheetButton[] = mainButtons.slice();

    if (isFollowing) {
      buttons.unshift({
        text: 'Unfollow',
        role: 'unfollow',
        cssClass: 'unfollow-button',
        handler: () => {
          console.log('Unfollow clicked');
        }
      });
    }

    if (isPost) {
      buttons.unshift({
        text: 'To Post',
        role: 'redirect',
        handler: () => {
          console.log('redirect clicked');
        }
      });
    }

    const actionSheet = await this.actionSheet.create({
      cssClass: 'main-action-sheet',
      buttons: buttons
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}

const mainButtons: ActionSheetButton[] = [
  {
    text: 'Report',
    role: 'report',
    cssClass: 'report-button',
    handler: () => {
      console.log('Report clicked');
    }
  },
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      console.log('Cancel clicked');
    }
  }
]
