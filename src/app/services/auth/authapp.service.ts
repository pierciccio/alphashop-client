import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { port, server } from 'src/app/app.constants';
import { AuthData } from 'src/app/models/AuthData';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor(
    private httpClient: HttpClient
  ) { }


  autenticaService = (UserId: string, Password: string) => {

    let AuthString = "Basic " + window.btoa(UserId + ":" + Password);

    let headers = new HttpHeaders(
      { Authorization: AuthString }
    )

    return this.httpClient
      .get<AuthData>(`http://${server}:${port}/api/articoli/test`, { headers })
      .pipe(map(
        data => {
          sessionStorage.setItem('Utente', UserId);
          sessionStorage.setItem('AuthToken', AuthString);

          return data;
        }
      ));
  }


  loggedUser = () => {
    const utente = sessionStorage.getItem('Utente');
    return (sessionStorage.getItem('Utente') != null) ? utente : '';
  }

  getAuthToken() {
    if (this.loggedUser())
      return sessionStorage.getItem('AuthToken');
    else
      return '';
  }

  isLogged = () => (sessionStorage.getItem('Utente') != null) ? true : false;

  clearAll = () => sessionStorage.removeItem('Utente');
}
