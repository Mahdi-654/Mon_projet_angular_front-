import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Joueur } from './models/joueur.model';

@Injectable({
  providedIn: 'root',
})
export class JoueurService {
  private apiUrl = 'http://localhost:3001/api/joueurs'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Ajouter un joueur
  ajouterJoueur(joueur: Joueur): Observable<Joueur> {
    console.log('Données envoyées :', joueur); // Affichez les données envoyées
    return this.http.post<Joueur>(this.apiUrl, joueur).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'ajout du joueur :', error);
        return throwError(() => new Error('Erreur serveur'));
      })
    );
  }

  // Obtenir tous les joueurs
  getJoueurs(): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(this.apiUrl);
  }

  // Obtenir un joueur par son ID
  getJoueur(id: string): Observable<Joueur> {
    return this.http.get<Joueur>(`${this.apiUrl}/${id}`);
  }

  // Modifier un joueur
  modifierJoueur(id: string, joueur: Joueur): Observable<Joueur> {
    return this.http.patch<Joueur>(`${this.apiUrl}/${id}`, joueur);
  }

  // Supprimer un joueur
  supprimerJoueur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
