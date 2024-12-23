import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Votre module de routage
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importation de FormsModule et ReactiveFormsModule pour les formulaires
import { AjouterJoueurComponent } from './ajouter-joueur/ajouter-joueur.component'; // Exemple de composant
import { ConsulterJouerComponent } from './consulter-jouer/consulter-jouer.component'; // Exemple de composant
import { DashboardComponent } from './dashboard/dashboard.component'; // Exemple de composant
import { HistoriqueClubComponent } from './historique-club/historique-club.component'; // Exemple de composant
import { HomeComponent } from './home/home.component'; // Exemple de composant
import { LoginComponent } from './login/login.component'; // Exemple de composant
import { NavigationComponent } from './navigation/navigation.component'; // Exemple de composant
import { TrainingCalendarComponent } from './training-calendar/training-calendar.component'; // Exemple de composant
import { NgxPaginationModule } from 'ngx-pagination'; // Importer le module pour pagination
import { HttpClientModule } from '@angular/common/http';  // Importation d'HttpClientModule
import { ModifierJoueurComponent } from './modifier-joueur/modifier-joueur.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AjouterJoueurComponent,  // Déclarer le composant AjouterJoueurComponent
    ConsulterJouerComponent,
    DashboardComponent,
    HistoriqueClubComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    TrainingCalendarComponent,
    ModifierJoueurComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  // Ajout de FormsModule ici pour utiliser ngModel
    ReactiveFormsModule,  // Ajout de ReactiveFormsModule ici pour les formulaires réactifs
    NgxPaginationModule,  // Ajouter le module de pagination
    HttpClientModule,  // Ajouter le module HttpClient pour les requêtes HTTP
  ],
  providers: [],
  bootstrap: [AppComponent]  // Composant de démarrage
})
export class AppModule { }
