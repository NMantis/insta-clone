import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  loading$: Observable<boolean>;
  
  constructor(
    private auth: AuthService,
    private loader: LoaderService
  ) {
    this.loading$ = this.loader.state;
  }

  get username(): string {
    return this.auth.user?.username;
  }

}
