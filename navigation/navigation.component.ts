import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import du service d'authentification
import { CookieService } from 'ngx-cookie-service'; // Assurez-vous d'avoir installé ngx-cookie-service

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private cookieService: CookieService
  ) {}

  // Méthode pour se déconnecter
  logout() {
    this.authService.logout(); // Appeler la méthode de déconnexion dans AuthService
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Vérifier si l'utilisateur est connecté
  }

  // Méthode pour vérifier si l'utilisateur est un admin
  isAdmin(): boolean {
    const role = this.cookieService.get('role');
    return role === 'admin';  // Si le rôle est "admin", retourne vrai
  }

  // Méthode pour vérifier si l'utilisateur est un utilisateur normal
  isUser(): boolean {
    const role = this.cookieService.get('role');
    return role === 'user'; // Si le rôle est "user", retourne vrai
  }
}
