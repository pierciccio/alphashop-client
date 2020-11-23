import { SalutiDataService } from './../../services/data/saluti-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  saluti = 'Benvenuti nel sito Alphashop';
  titolo2 = 'Seleziona gli articoli da acquistare';

  utente = '';
  messaggio = '';

  constructor(
    private route: ActivatedRoute,
    private salutiSrv: SalutiDataService
  ) { }

  ngOnInit(): void {
    this.utente = this.route.snapshot.params.userId;
  }

  getSaluti() {
    console.log(this.salutiSrv.getSaluti(this.utente));

    this.salutiSrv.getSaluti(this.utente).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    );
  }

  handleResponse(response: any) {
    this.messaggio = response;
    console.log(response);    
  }

  handleError(error: any) {
    this.messaggio = error.error.message;
  }

}
