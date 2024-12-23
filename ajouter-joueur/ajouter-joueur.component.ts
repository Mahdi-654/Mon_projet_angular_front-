import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoueurService } from '../joueur.service';
import { Joueur } from '../models/joueur.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-joueur',
  styleUrls: ['./ajouter-joueur.component.css'],
  templateUrl: './ajouter-joueur.component.html',
})
export class AjouterJoueurComponent implements OnInit {
  joueurForm: FormGroup;
  currentJoueurId: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private joueurService: JoueurService,
    private router: Router
  ) {
    this.joueurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ['', Validators.required],
      numero: [null, [Validators.required, Validators.min(1)]],
      equipe: ['', Validators.required],
      statistiques: this.fb.group({
        matchsJoués: [0, Validators.min(0)],
        buts: [0, Validators.min(0)],
        passes: [0, Validators.min(0)],
      }),
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const joueur: Joueur = navigation.extras.state['joueur'];
      console.log('Données récupérées du joueur:', joueur);
      if (joueur) {
        this.currentJoueurId = joueur._id;
        this.joueurForm.patchValue({
          nom: joueur.nom,
          prenom: joueur.prenom,
          poste: joueur.poste,
          numero: joueur.numero,
          equipe: joueur.equipe,
          statistiques: {
            matchsJoués: joueur.statistiques.matchsJoués,
            buts: joueur.statistiques.buts,
            passes: joueur.statistiques.passes,
          },
        });
      }
    }
  }

  onSubmit(): void {
    if (this.joueurForm.valid) {
      const joueur: Joueur = {
        ...this.joueurForm.value,
      };
      console.log('Données du formulaire:', joueur);

      if (this.currentJoueurId) {
        this.joueurService.modifierJoueur(this.currentJoueurId, joueur).subscribe({
          next: () => {
            console.log('Joueur mis à jour');
            this.router.navigate(['/']); // Redirection après mise à jour
          },
          error: (error) => {
            this.errorMessage = 'Erreur lors de la mise à jour du joueur';
            console.error(error);
          },
        });
      } else {
        this.joueurService.ajouterJoueur(joueur).subscribe({
          next: () => {
            console.log('Joueur ajouté');
            this.router.navigate(['/joueurs']); // Redirection après ajout
          },
          error: (error) => {
            this.errorMessage = 'Erreur lors de l\'ajout du joueur';
            console.error(error);
          },
        });
      }
    } else {
      console.error('Le formulaire n\'est pas valide.', this.joueurForm.errors);
    }
  }

  resetForm() {
    this.joueurForm.reset();
    this.currentJoueurId = null;
    this.errorMessage = null;
  }

  // Méthode pour rediriger vers le composant ConsulterJouer
  goToConsulterJoueur() {
    this.router.navigate(['/consulter-jouer']);
  }
}
