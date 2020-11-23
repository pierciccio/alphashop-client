import { Component, OnInit } from '@angular/core';
import { AuthappService } from 'src/app/services/auth/authapp.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public BasicAuth: AuthappService
  ) { }

  ngOnInit(): void {
  }

}
