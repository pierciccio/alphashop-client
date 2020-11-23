import { AuthJwtService } from './../../services/auth/auth-jwt.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid = '';
  password = '';
  autenticato = true;
  errorMsg = 'Spiacente, la userid o la password sono errati!';

  constructor(
    private route: Router,
    private authJwtService: AuthJwtService
  ) { }

  ngOnInit(): void {
  }

  gestAut(): void {

    this.authJwtService.autenticaService(this.userid, this.password).subscribe(
      data => {
        //console.log(data);
        this.autenticato = true;
        this.route.navigate(['welcome', this.userid]);
      },
      error => {
        console.log(error);
        this.autenticato = false;        
      }
    )

  }
}
