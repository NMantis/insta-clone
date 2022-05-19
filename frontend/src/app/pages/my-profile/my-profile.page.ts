import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { BehaviorSubject, Subject } from "rxjs";
import { first } from "rxjs/operators";
import { Filters } from "src/app/models/Filters";
import { ProfileData } from "src/app/models/ProfileData";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.page.html",
  styleUrls: ["./my-profile.page.scss"],
})
export class MyProfilePage {

  filters$: BehaviorSubject<Filters>;
  profileData: ProfileData;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private modal: ModalController,
    private route: ActivatedRoute,
    private alert: AlertController,
    private auth: AuthService
  ) { }

  // Define segment for everytime when profile page is active
  ionViewDidEnter() {
    this.route.data
      .pipe(first())
      .subscribe(({ data }) => (this.profileData = data));
  }

  async logout() {
    const alert = await this.alert.create({
      header: "Logout",
      message: "Are you sure you wish to logout?",
      buttons: [
        {
          text: "NO",
          role: "cancel",
        },
        {
          text: "YES",
          handler: () => {
            this.auth.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  ionViewDidLeave() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
