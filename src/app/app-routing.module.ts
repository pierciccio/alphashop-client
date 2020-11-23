import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { Ruoli } from './models/Ruoli';
import { NewartComponent } from './components/newart/newart.component';
import { RouteGuardService } from './services/route-guard.service';
import { LogoutComponent } from './components/logout/logout.component';
import { ArticoliComponent } from './components/articoli/articoli.component';
import { ErrorComponent } from './components/error/error.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'index', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome/:userId', component: WelcomeComponent, canActivate: [RouteGuardService], data: { roles: [Ruoli.utente] } },
  { path: 'articoli', component: ArticoliComponent, canActivate: [RouteGuardService], data: { roles: [Ruoli.utente] } },
  { path: 'articoli/:filter', component: ArticoliComponent, canActivate: [RouteGuardService], data: { roles: [Ruoli.utente] } },
  { path: 'newart/:codart', component: NewartComponent, canActivate: [RouteGuardService], data: { roles: [Ruoli.amministratore] } },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
