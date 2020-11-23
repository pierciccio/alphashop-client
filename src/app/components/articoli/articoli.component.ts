import { ActivatedRoute, Router } from '@angular/router';
import { ArticoliDataService } from './../../services/data/articoli-data.service';
import { Component, OnInit } from '@angular/core';
import { ApiMsg } from '../../models/ApiMsg';
import { Articoli } from 'src/app/models/Articoli';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {

  NumArt = 0;
  righe = 10;
  pagina = 1;

  apiMsg!: ApiMsg;
  messaggio!: string;

  articoli: Articoli[] = [];
  articolo!: Articoli;
  filter = '';

  constructor(
    private articoliDataService: ArticoliDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filter = this.route.snapshot.params['filter'];

    if (this.filter != undefined) {
      this.getArticoli(this.filter);
    }
  }

  refresh() {
    this.getArticoli(this.filter);
  }

  getArticoli(filter: string) {
    this.articoliDataService.getArticoliByCodArt(filter).subscribe(
      response => {

        this.articoli = [];
        //console.log('ricerca articolo per codice: ' + filter);

        this.articolo = response;
        //console.log(this.articolo);

        this.articoli.push(this.articolo);
        this.NumArt = this.articoli.length;
        // console.log(this.articoli.length);        
      },
      error => {
        //console.log(error.error.messaggio);

        this.articoliDataService.getArticoliByEan(filter).subscribe(
          response => {
            this.articoli = [];
            //console.log('ricerchiamo articoli con barcode ' + filter);
            this.articolo = response;
            //console.log(this.articolo);
            this.articoli.push(this.articolo)
            this.NumArt = this.articoli.length;
          }
        )

        this.articoliDataService.getArticoliByDescription(filter).subscribe(
          response => {
            //console.log('ricerchiamo articoli con descrizione ' + filter);
            this.articoli = response;
            this.NumArt = this.articoli.length;
          }
        )
      }

    )
  }

  Elimina(CodArt: string) {
    console.log('Elimina ' + CodArt);
    this.articoliDataService.delArticoloByCodArt(CodArt).subscribe(
      response => {
        this.apiMsg = response;
        this.messaggio = this.apiMsg.message;
        this.refresh();
      }
    )
  }

  Modifica(CodArt: string) {
    console.log('Modifica ' + CodArt);
    this.router.navigate(['newart', CodArt]);
  }

}
