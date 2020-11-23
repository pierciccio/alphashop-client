import { ApiMsg } from "../../models/ApiMsg";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articoli } from 'src/app/models/Articoli';
import { FamAssort } from 'src/app/models/FamAssort';
import { Iva } from 'src/app/models/Iva';
import { server, port } from 'src/app/app.constants';


@Injectable({
  providedIn: 'root'
})
export class ArticoliDataService {  

  constructor(
    private httpClient: HttpClient
  ) { }

 
  getArticoliByDescription(descrizione: string) {
    return this.httpClient
      .get<Articoli[]>(`http://${server}:${port}/api/articoli/cerca/descrizione/${descrizione}`);
  }

  getArticoliByCodArt(codart: string) {
    return this.httpClient
      .get<Articoli>(`http://${server}:${port}/api/articoli/cerca/codice/${codart}`);
  }

  getArticoliByEan(barcode: string) {   
    return this.httpClient
      .get<Articoli>(`http://${server}:${port}/api/articoli/cerca/ean/${barcode}`);
  }

  delArticoloByCodArt(codart: string) {
    return this.httpClient
      .delete<ApiMsg>(`http://${server}:${port}/api/articoli/elimina/${codart}`);
  }

  updArticoli(articolo: Articoli) {
    return this.httpClient
      .put<ApiMsg>(`http://${server}:${port}/api/articoli/modifica`, articolo);
  }

  insArticoli(articolo: Articoli) {
    return this.httpClient
      .post<ApiMsg>(`http://${server}:${port}/api/articoli/inserisci`, articolo);
  }

  getFamAssort() {
    return this.httpClient
      .get<FamAssort>(`http://${server}:${port}/api/categoria/cerca/tutti`);
  }

  getIva() {
    return this.httpClient
    .get<Iva>(`http://${server}:${port}/api/iva/cerca/tutti`);

  }
}
