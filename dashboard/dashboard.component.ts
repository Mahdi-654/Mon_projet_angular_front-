import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // Importer seulement DataService ici
import { Match } from '../models/Match.models'; // Chemin d'importation correct
import { Classement } from '../models/Classement.models'; // Chemin d'importation correct

@Component({
    selector: 'app-dashboard', // Ajout du sélecteur
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    matchs: Match[] = [];
    classements: Classement[] = [];

    newMatch: Match = { _id: '', equipe1: '', equipe2: '', date: '', heure: '', lieu: '' };
    newClassement: Classement = { _id: '', equipe: '', points: 0, matchesJoues: 0, wins: 0, draws: 0, losses: 0 }; // Mettez à jour ici

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.loadMatches();
        this.loadClassements();
    }

    loadMatches(): void {
        this.dataService.getMatchs().subscribe({
            next: (data) => {
                this.matchs = data;
            },
            error: (err) => {
                console.error("Erreur lors du chargement des matchs:", err);
            }
        });
    }

    loadClassements(): void {
        this.dataService.getClassements().subscribe({
            next: (data) => {
                // Convertir les points en nombres
                this.classements = data.map(classement => ({
                    ...classement,
                    points: Number(classement.points) // Assurez-vous que c'est un nombre
                }));
                console.log("Classements avant tri:", this.classements);
                this.trierClassements(); // Appeler le tri après le chargement des classements
            },
            error: (err) => {
                console.error("Erreur lors du chargement des classements:", err);
            }
        });
    }
    
    createMatch(): void {
        const { equipe1, equipe2, date, heure, lieu } = this.newMatch;
        const matchToCreate: Omit<Match, '_id'> = { equipe1, equipe2, date, heure, lieu };

        if (equipe1 && equipe2 && date && heure && lieu) {
            this.dataService.createMatch(matchToCreate).subscribe({
                next: () => {
                    this.loadMatches();
                    this.resetMatchForm();
                },
                error: (err) => {
                    console.error("Erreur lors de l'ajout du match:", err);
                    alert("Erreur lors de l'ajout du match: " + err.error?.details || err.message);
                }
            });
        } else {
            console.error("Tous les champs doivent être remplis pour ajouter un match.");
        }
    }

    updateMatch(match: Match): void {
        if (!match._id) {
          console.error('Erreur: ID du match non défini.');
          return;
        }
      
        const { _id, ...updatedMatch } = match; // Extraire l'ID et le reste de l'objet
      
        if (!updatedMatch.equipe1 || !updatedMatch.equipe2 || !updatedMatch.date || !updatedMatch.heure || !updatedMatch.lieu) {
          console.error('Erreur: Tous les champs doivent être remplis pour mettre à jour le match.');
          alert('Tous les champs doivent être remplis pour mettre à jour le match.');
          return;
        }
      
        this.dataService.updateMatch(_id, updatedMatch).subscribe({
          next: () => {
            console.log('Match mis à jour avec succès:', updatedMatch);
            this.loadMatches(); // Recharge les matchs après la mise à jour
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du match:', err);
            alert('Erreur lors de la mise à jour du match: ' + (err.error?.message || err.message));
          }
        });
      }
      

    deleteMatch(id: string): void {
        if (id) {
            this.dataService.deleteMatch(id).subscribe({
                next: () => {
                    this.loadMatches();
                },
                error: (err) => {
                    console.error("Erreur lors de la suppression du match:", err);
                }
            });
        } else {
            console.error("Erreur: ID du match non défini pour la suppression.");
        }
    }

    createClassement(): void {
        const { equipe, points, matchesJoues, wins, draws, losses } = this.newClassement;
  
        if (equipe && points >= 0 && matchesJoues >= 0 && wins >= 0 && draws >= 0 && losses >= 0) {
            const classementToSend = { equipe, points, matchesJoues, wins, draws, losses };
  
            this.dataService.createClassement(classementToSend).subscribe({
                next: () => {
                    this.loadClassements();
                    this.trierClassements(); // Appeler le tri ici après le chargement des classements
                    this.resetClassementForm();
                },
                error: (err) => {
                    console.error("Erreur lors de l'ajout du classement:", err);
                    alert("Erreur lors de l'ajout du classement: " + (err.error?.message || err.message));
                }
            });
        } else {
            console.error("Erreur: Tous les champs du classement doivent être remplis.");
            alert("Tous les champs du classement doivent être remplis.");
        }
    }
  
    trierClassements(): void {
        this.classements.sort((a, b) => b.points - a.points); // Tri par points décroissants
    }
  
    updateClassement(classement: Classement): void {
        if (classement._id && classement.equipe && classement.points >= 0 && classement.matchesJoues >= 0 && classement.wins >= 0 && classement.draws >= 0 && classement.losses >= 0) {
            this.dataService.updateClassement(classement._id, classement).subscribe({
                next: () => {
                    this.loadClassements();
                },
                error: (err) => {
                    console.error("Erreur lors de la mise à jour du classement:", err);
                }
            });
        } else {
            console.error("Erreur: ID du classement ou des informations non définies.");
        }
    }

    deleteClassement(id: string): void {
        console.log("ID à supprimer:", id);
        this.dataService.deleteClassement(id).subscribe({
            next: () => {
                this.loadClassements();
            },
            error: (err) => {
                console.error("Erreur lors de la suppression du classement:", err);
                alert("Erreur lors de la suppression du classement: " + (err.error?.message || err.message));
            }
        });
    }
  
    private resetMatchForm(): void {
        this.newMatch = { _id: '', equipe1: '', equipe2: '', date: '', heure: '', lieu: '' };
    }

    private resetClassementForm(): void {
        this.newClassement = { _id: '', equipe: '', points: 0, matchesJoues: 0, wins: 0, draws: 0, losses: 0 }; // Mettez à jour ici
    }
}
