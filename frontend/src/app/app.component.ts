import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { filter, mergeMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private userService: UserService
  ) {
    this.initializeApp();

    this.auth.token$.asObservable()
      .pipe(
        take(1),
        filter(token => !this.auth.user && token && token != 'null'),
        mergeMap(() => this.userService.current()),
        tap(usr => this.auth.setUser(usr))
      ).subscribe();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
