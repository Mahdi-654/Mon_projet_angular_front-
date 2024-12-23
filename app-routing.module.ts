import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterJoueurComponent } from './ajouter-joueur/ajouter-joueur.component'; // Importation de AjouterJoueurComponent
import { ConsulterJouerComponent } from './consulter-jouer/consulter-jouer.component'; // Importation de ConsulterJouerComponent
import { DashboardComponent } from './dashboard/dashboard.component'; // Importation de DashboardComponent
import { HistoriqueClubComponent } from './historique-club/historique-club.component'; // Importation de HistoriqueClubComponent
import { HomeComponent } from './home/home.component'; // Importation de HomeComponent
import { LoginComponent } from './login/login.component'; // Importation de LoginComponent
import { NavigationComponent } from './navigation/navigation.component'; // Importation de NavigationComponent
import { TrainingCalendarComponent } from './training-calendar/training-calendar.component'; // Importation de TrainingCalendarComponent
import { ModifierJoueurComponent } from './modifier-joueur/modifier-joueur.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Route par défaut
  
    // Redirection par défaut vers la page home
  { path: 'home', component: HomeComponent },  // Route vers le composant Home
  { path: 'historique-club', component: HistoriqueClubComponent },  // Route vers HistoriqueClubComponent
  { path: 'ajouter-joueur', component: AjouterJoueurComponent },  // Route vers AjouterJoueurComponent
  { path: 'consulter-jouer', component: ConsulterJouerComponent },  // Route vers ConsulterJouerComponent
  { path: 'dashboard', component: DashboardComponent },  // Route vers DashboardComponent
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, // Route vers LoginComponent
  { path: 'navigation', component: NavigationComponent },  // Route vers NavigationComponent
  { path: 'training-calendar', component: TrainingCalendarComponent }, 
  { path: 'modifier-joueur/:id', component: ModifierJoueurComponent },
  { path: '**', redirectTo: '/consulter-jouer' },  // Route vers TrainingCalendarComponent
  { path: '**', redirectTo: '' }  // Redirection si la route n'est pas trouvée
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Application des routes
  exports: [RouterModule]  // Exporter les routes pour qu'elles soient accessibles partout dans l'app
})
export class AppRoutingModule { }
