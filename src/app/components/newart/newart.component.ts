import { ApiMsg } from "../../models/ApiMsg";
import { ActivatedRoute, Router } from '@angular/router';
import { ArticoliDataService } from './../../services/data/articoli-data.service';
import { Component, OnInit } from '@angular/core';
import { Articoli } from 'src/app/models/Articoli';
import { FamAssort } from 'src/app/models/FamAssort';
import { Iva } from 'src/app/models/Iva';

@Component({
  selector: 'app-newart',
  templateUrl: './newart.component.html',
  styleUrls: ['./newart.component.css']
})
export class NewartComponent implements OnInit {

  CodArt!: string;
  articolo!: Articoli;

  apiMsg!: ApiMsg;

  conferma: string = '';
  errore: string = '';

  isModifica = false;

  Iva: Iva | any;
  FamAssort: FamAssort | any;

  
  constructor(
    private articoliDataService: ArticoliDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.CodArt = this.route.snapshot.params['codart'];

    this.articolo = new Articoli("-1","","","",0,0,0,"1",
    new Date(),null!,new FamAssort(1,""),null!, new Iva(22,"",22));

      this.articoliDataService.getFamAssort().subscribe(
        response => {
          this.FamAssort = response;
          //console.log(response);          
        },
        error => {
          //console.log(error);          
        }
      )

      this.articoliDataService.getIva().subscribe(
        response => {
  
          this.Iva = response;
          //console.log(response);
        },
        error => {
          //console.log(error);
        }
      )

    if (this.CodArt != '-1') {
      this.isModifica = true;
      this.articoliDataService.getArticoliByCodArt(this.CodArt).subscribe(
        response => {
          this.articolo = response;
          //console.log(this.articolo);
        },
        error => {
          //console.log(error.error.messaggio);
        }
      )
    }
    else {
      this.isModifica = false;
    }

  }

  Salva() {
    this.conferma = '';
    this.errore = '';

    if (this.CodArt === '-1') {
      this.articoliDataService.insArticoli(this.articolo).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          this.router.navigate(['articoli', this.articolo.codArt]);
        },
        error => {
          this.errore = error.error.messaggio
          console.log(this.errore);
        }
      )
    }
    else {
      this.articoliDataService.updArticoli(this.articolo).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          this.router.navigate(['articoli', this.articolo.codArt]);
        },
        error => {
          this.errore = error.error.messaggio
          console.log(this.errore);
        }
      )
    }
  }


  abort() {
    if(this.CodArt === '-1') {
    this.router.navigate(['articoli']);
    }
    else{
      this.router.navigate(['articoli', this.articolo.codArt]);
    }
  }
}
