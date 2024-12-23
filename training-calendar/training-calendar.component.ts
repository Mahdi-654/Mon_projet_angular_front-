import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service'; 
import { Training } from '../models/training.models';

@Component({
  selector: 'app-training-calendar',
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.css']
})
export class TrainingCalendarComponent implements OnInit {
  training: Training = new Training('', '', '', new Date(), 0, '', '');
  trainings: Training[] = [];
  isEditMode: boolean = false;  // Ajouter une variable pour savoir si on est en mode édition ou ajout

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.getTrainings(); // Initialiser la liste des entraînements au démarrage
  }

  // Récupérer tous les entraînements
  getTrainings(): void {
    this.trainingService.getTrainings().subscribe(
      (trainings) => {
        this.trainings = trainings; 
      },
      (error) => {
        console.error('Erreur lors de la récupération des entraînements:', error);
      }
    );
  }

 // Ajouter un nouvel entraînement
addTraining(newTraining: Training): void {
  this.trainingService.addTraining(newTraining).subscribe(
    response => {
      console.log('Entraînement ajouté:', response);
      this.trainings.push(response);  // Ajout immédiat dans la liste sans recharger
      this.resetForm();  // Réinitialiser le formulaire
    },
    error => {
      console.error('Erreur lors de l\'ajout de l\'entraînement:', error);
    }
  );
}

// Mettre à jour un entraînement
updateTraining(training: Training): void {
  this.trainingService.updateTraining(training).subscribe(
    (updatedTraining) => {
      const index = this.trainings.findIndex(t => t._id === updatedTraining._id);
      if (index !== -1) {
        this.trainings[index] = updatedTraining;  // Mise à jour immédiate dans la liste
      }
      this.resetForm();  // Réinitialiser le formulaire après mise à jour
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de l\'entraînement:', error);
    }
  );
}


  // Supprimer un entraînement
  deleteTraining(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet entraînement ?')) {
      this.trainingService.deleteTraining(id).subscribe(
        () => {
          this.trainings = this.trainings.filter(training => training._id !== id); 
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'entraînement:', error);
        }
      );
    }
  }

  // Sélectionner un entraînement pour le modifier
  selectTraining(training: Training): void {
    this.training = { ...training };  // Pré-remplir le formulaire avec les données de l'entraînement sélectionné
    this.isEditMode = true; // Passer en mode édition
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.training = new Training('', '', '', new Date(), 0, '', '');
    this.isEditMode = false;  // Quitter le mode édition
  }
}
