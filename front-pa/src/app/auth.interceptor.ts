import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérez le jeton d'authentification à partir du stockage (par exemple, localStorage)
    const authToken = localStorage.getItem('authToken');

    // Vérifiez si le jeton est disponible
    if (authToken) {
      // Cloner la requête et ajouter le jeton d'authentification à l'en-tête
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        },
        headers: request.headers.set('Access-Control-Allow-Origin', '*')
      });


      // Passez la nouvelle requête modifiée à l'intercepteur suivant ou au backend
      return next.handle(authRequest);
    }

    // Si aucun jeton n'est disponible, continuez avec la requête d'origine
    return next.handle(request);
  }

}
