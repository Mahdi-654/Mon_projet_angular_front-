import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Match } from '../models/Match.models';
import { Classement } from '../models/Classement.models';
import { Training } from '../models/training.models'; // Importer le modèle Training

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  matchs: Match[] = []; // Tableau pour stocker les matchs
  classements: Classement[] = []; // Tableau pour stocker les classements
  trainings: Training[] = []; // Tableau pour stocker les entraînements

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadMatchs(); // Charger les matchs lors de l'initialisation du composant
    this.loadClassements(); // Charger les classements
    this.loadTrainings(); // Charger les entraînements
  }

  loadMatchs(): void {
    this.dataService.getMatchs().subscribe({
      next: (data) => {
        this.matchs = data; // Stocker les matchs récupérés dans le tableau
      },
      error: (err) => {
        console.error("Erreur lors du chargement des matchs:", err);
      }
    });
  }

  loadClassements(): void {
    this.dataService.getClassements().subscribe({
      next: (data) => {
        this.classements = data; // Stocker les classements récupérés dans le tableau
        this.trierClassements(); // Tri des classements après le chargement
      },
      error: (err) => {
        console.error("Erreur lors du chargement des classements:", err);
      }
    });
  }

  loadTrainings(): void {
    this.dataService.getTrainings().subscribe({
      next: (data) => {
        this.trainings = data; // Stocker les entraînements récupérés dans le tableau
      },
      error: (err) => {
        console.error("Erreur lors du chargement des entraînements:", err);
      }
    });
  }

  trierClassements(): void {
    this.classements.sort((a, b) => b.points - a.points); // Tri par points décroissants
  }
}
