import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token'); // Récupère le token du localStorage

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` // Ajoute le token dans les en-têtes
                }
            });
        }

        return next.handle(request); // Continue avec la requête
    }
}
