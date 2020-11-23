import { authServerUri } from './../../app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'


export const CONST_UTENTE = 'Utente';
export const CONST_AUTH_TOKEN = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  constructor(
    private httpClient: HttpClient
  ) { }


  autenticaService = (username: string, password: string) => {

    return this.httpClient
      .post<any>(`${authServerUri}`, { username, password })
      .pipe(map(
        data => {
          sessionStorage.setItem(CONST_UTENTE, username);
          sessionStorage.setItem(CONST_AUTH_TOKEN, `Bearer ${data.token}`);

          return data;
        }
      ));
  }


  loggedUser = () => {
    const utente = sessionStorage.getItem(CONST_UTENTE);
    return (sessionStorage.getItem(CONST_UTENTE) != null) ? utente : '';
  }

  getAuthToken() {
    if (this.loggedUser())
      return sessionStorage.getItem(CONST_AUTH_TOKEN);
    else
      return '';
  }

  isLogged = () => (sessionStorage.getItem(CONST_UTENTE) != null) ? true : false;

  clearAll = () => sessionStorage.removeItem(CONST_UTENTE);
}
