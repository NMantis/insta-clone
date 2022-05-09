import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(protected auth: AuthService) { }

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

        return next.handle(new_request)
    }
}