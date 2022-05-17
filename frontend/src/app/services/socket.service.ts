import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private echo: Echo;
  public isListening: boolean = false;

  constructor() { }

  setup(token: string) {

    if (this.echo) {
      this.echo.disconnect();
    }

    if (!token?.length || token == 'null') {
      // @ts-ignore
      this.echo = null;
      return;
    }

    const domain = window.location.hostname;

    this.echo = new Echo({
      broadcaster: 'pusher',
      wsHost: env.production ? domain.replace(/^[^.]*/, env.ws_url) : env.ws_url,
      key: env.ws_key,
      forceTLS: false,
      disableStats: true,
      authEndpoint: `${env.baseUrl}/api/broadcasting/auth`,
      auth: {
        headers: { Authorization: `Bearer ${token}` }
      }
    })
  }


  listen(userId: string) {
    this.isListening = true;

    this.echo.private(`notifications.${userId}`)
      .listen('.App\\Events\\FollowRequest', (ev) => {
        console.log(ev);
      })
  }

}
