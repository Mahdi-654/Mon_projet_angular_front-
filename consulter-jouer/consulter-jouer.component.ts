import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurService } from '../joueur.service';
import { Joueur } from '../models/joueur.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router'; // Import du Router

// Définir l'interface pour l'état de navigation
interface NavigationState {
  joueur: Joueur;
}

@Component({
  selector: 'app-consulter-jouer',
  templateUrl: './consulter-jouer.component.html',
  styleUrls: ['./consulter-jouer.component.css']
})
export class ConsulterJouerComponent implements OnInit {
  joueurForm: FormGroup; // Formulaire pour ajouter/modifier un joueur
  joueurs: Joueur[] = []; // Liste des joueurs
  currentJoueurId: string | null = null; // ID du joueur en cours d'édition
  p: number = 1; // Gestion de la pagination
  errorMessage: string | null = null; // Message d'erreur pour affichage

  constructor(
    private fb: FormBuilder,
    private joueurService: JoueurService,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.joueurForm = this.fb.group({
      nom: ['', Validators.required],
      prénom: ['', Validators.required],
      poste: ['', Validators.required],
      numéro: [null, [Validators.required, Validators.min(1)]],
      équipe: ['', Validators.required],
      statistiques: this.fb.group({
        matchsJoués: [0, Validators.min(0)],
        buts: [0, Validators.min(0)],
        passes: [0, Validators.min(0)],
      }),
    });
  }

  ngOnInit(): void {
    console.log('Chargement des joueurs...'); // Log pour débogage
    this.loadJoueurs();
  
    // Vérification des données de navigation
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as NavigationState;
      if (state.joueur) {
        console.log('Données du joueur à éditer:', state.joueur); // Log pour validation
        this.loadJoueurToEdit(state.joueur);
      }
    }
  }
  
  loadJoueurs(): void {
    this.joueurService.getJoueurs().pipe(
      tap(data => {
        console.log('Joueurs chargés:', data); // Log les joueurs récupérés
        this.joueurs = data;
      }),
      catchError(error => {
        this.errorMessage = 'Erreur lors du chargement des joueurs';
        console.error(error);
        return of([]); // Renvoie une liste vide en cas d'erreur
      })
    ).subscribe();
  }
  

  loadJoueurToEdit(joueur: Joueur): void {
    console.log('Joueur à éditer:', joueur); // Log pour débogage
    this.currentJoueurId = joueur._id; // Stocker l'ID du joueur en cours
    this.joueurForm.patchValue({
      nom: joueur.nom,
      prénom: joueur.prenom,
      poste: joueur.poste,
      numéro: joueur.numero,
      équipe: joueur.equipe,
      statistiques: {
        matchsJoués: joueur.statistiques.matchsJoués,
        buts: joueur.statistiques.buts,
        passes: joueur.statistiques.passes,
      }
    });
  }
  

  editJoueur(joueur: Joueur): void {
    this.router.navigate([`/modifier-joueur`, joueur._id]); // Navigation avec l'ID
  }

  historiqueClub() {
    this.router.navigate(['/historique-club']);
  }
  
  // Supprimer un joueur
  deleteJoueur(_id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
      this.joueurService.supprimerJoueur(_id).pipe(
        tap(() => {
          this.joueurs = this.joueurs.filter(joueur => joueur._id !== _id);
          console.log('Joueur supprimé avec succès');
        }),
        catchError(error => {
          this.errorMessage = 'Erreur lors de la suppression du joueur';
          console.error(error);
          return of(null);
        })
      ).subscribe();
    }
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.joueurForm.reset();
    this.currentJoueurId = null;
    this.errorMessage = null;
  }
}
