import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthappService } from '../auth/authapp.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {

  constructor(
    private authappService: AuthappService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let AuthToken = this.authappService.getAuthToken();
    let User = this.authappService.loggedUser();

    if (AuthToken && User) {
      req = req.clone(
        {
          setHeaders: { Authorization: AuthToken }
        }
      )
    }
    return next.handle(req);
  }
}
