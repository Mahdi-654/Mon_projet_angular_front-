// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const user = this.authService.getUser(); // Récupérer l'utilisateur

    if (user) {
      // Vérifiez si l'utilisateur est admin
      if (user.role === 'admin') {
        return true; // Accès accordé pour l'admin
      } else {
        // Redirigez l'utilisateur normal vers la page d'accueil
        this.router.navigate(['/']);
        return false; // Accès refusé pour l'admin
      }
    }

    // Si aucun utilisateur n'est connecté, redirigez vers la page d'accueil
    this.router.navigate(['/']);
    return false;
  }
}
