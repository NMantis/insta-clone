import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        protected auth: AuthService,
        protected loaderService: LoaderService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let new_request: HttpRequest<any>;

        const jwt: string = this.auth.token$.value;

        if (jwt == null) {
            new_request = request.clone();
        } else {
            let headers = request.headers;
            headers = headers.append('Authorization', 'Bearer ' + jwt);
            new_request = request.clone({ headers });
        }

        return this.showLoader(next, new_request);
    }

    showLoader(next: HttpHandler, request: HttpRequest<any>): Observable<any> {

        if (
            !request.url.includes('like') &&
            !request.url.includes('/unlike')
        ) {
            this.loaderService.start();
        }

        return next.handle(request)
            .pipe(finalize(() => {
                setTimeout(() => this.loaderService.finish(), 320)
            }));
    }
}