import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurService } from '../joueur.service';
import { Joueur } from '../models/joueur.model';

@Component({
  selector: 'app-modifier-joueur',
  templateUrl: './modifier-joueur.component.html',
  styleUrls: ['./modifier-joueur.component.css']
})
export class ModifierJoueurComponent implements OnInit {
  joueurForm: FormGroup;
  currentJoueurId: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private joueurService: JoueurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Définir le formulaire avec tous les champs nécessaires
    this.joueurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ['', Validators.required],
      numero: [null, [Validators.required, Validators.min(1)]],
      equipe: ['', Validators.required],
      statistiques: this.fb.group({
        matchsJoues: [0, Validators.min(0)],
        buts: [0, Validators.min(0)],
        passes: [0, Validators.min(0)],
      }),
    });
  }

  ngOnInit(): void {
    const joueurId = this.route.snapshot.paramMap.get('id');
    if (joueurId) {
      this.currentJoueurId = joueurId;
      this.loadJoueurData(joueurId);  // Charger les données du joueur à partir de l'API
    }
  }

  loadJoueurData(id: string): void {
    this.joueurService.getJoueur(id).subscribe({
      next: (joueur: Joueur) => {
        // Remplir le formulaire avec les données du joueur
        this.joueurForm.patchValue({
          nom: joueur.nom,
          prenom: joueur.prenom,
          poste: joueur.poste,
          numero: joueur.numero,
          equipe: joueur.equipe,
          statistiques: joueur.statistiques,
        });
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des données du joueur';
      }
    });
  }

  onSubmit(): void {
    if (this.joueurForm.valid) {
      // Créer un objet joueur à partir des données du formulaire
      const joueur: Joueur = { ...this.joueurForm.value };

      console.log('Données envoyées pour modification:', joueur); // Debugging - pour afficher les données envoyées

      if (this.currentJoueurId) {
        // Appel au service pour modifier le joueur
        this.joueurService.modifierJoueur(this.currentJoueurId, joueur).subscribe({
          next: () => {
            console.log('Joueur mis à jour');
            this.router.navigate(['/joueurs']);  // Redirection vers la liste des joueurs après la modification
          },
          error: (error) => {
            this.errorMessage = 'Erreur lors de la mise à jour du joueur';
            console.error(error);
          }
        });
      }
    } else {
      console.error('Le formulaire n\'est pas valide.', this.joueurForm.errors); // Afficher les erreurs du formulaire
    }
  }

  resetForm(): void {
    this.joueurForm.reset();
    this.currentJoueurId = null;
    this.errorMessage = null;
  }
}
