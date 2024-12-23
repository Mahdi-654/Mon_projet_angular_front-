import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService // Injectez CookieService
  ) { }

  loginUser() {
    this.authService.loginUser(this.email, this.password).subscribe(
      (response) => {
        if (response.token) {
          // Ajouter le token dans les cookies
          this.cookieService.set('token', response.token, { secure: true, sameSite: 'Strict' });
          this.cookieService.set('role', response.user.role, { secure: true, sameSite: 'Strict' });
          this.cookieService.set('email', this.email, { secure: true, sameSite: 'Strict' });

          alert("Bienvenue !");
          
          if (this.authService.isAdmin()) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          alert("Connexion échouée : token non reçu.");
        }
      },
      (error) => {
        console.error(error);
        alert("Une erreur est survenue lors de la connexion. Veuillez vérifier vos identifiants.");
      }
    );
  }

  // Récupérer le token depuis les cookies
  getToken() {
    console.log('Token from cookies:', this.cookieService.get('token'));
    return this.cookieService.get('token');
  }

  // Déconnexion et suppression des cookies
  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    this.cookieService.delete('email');
    console.log('Cookies deleted: token, role, email');
    console.log('Token after logout:', this.cookieService.get('token')); // Devrait être vide après la suppression
    this.router.navigate(['/login']);
  }
}
