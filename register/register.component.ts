import { Component } from '@angular/core';
import { AuthService } from './../auth.service'; // Vérifiez le chemin d'importation
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};  // Déclarez un objet user pour contenir les données de l'utilisateur

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode pour soumettre les données d'inscription
  register() {
    const userData = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role  // Incluez ici le rôle de l'utilisateur
    };

    console.log("User data:", userData); // Affichez les données de l'utilisateur dans la console pour le débogage

    this.authService.registerUser(userData).subscribe(
      (response) => {
        console.log(response);
        alert('Inscription réussie');
        this.router.navigate(['/login']);  // Redirigez l'utilisateur vers la page de connexion après l'inscription
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        alert("Erreur lors de l'inscription");
      }
    );
  }
}
