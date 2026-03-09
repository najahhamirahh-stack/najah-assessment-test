import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);
        const token = authService.token;

        if (token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}