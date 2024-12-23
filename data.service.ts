import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './models/Match.models'; // Assurez-vous que le chemin d'importation est correct
import { Classement } from './models/Classement.models'; // Assurez-vous que le chemin d'importation est correct
import { Training } from './models/training.models'; // Importez le modèle Training

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3001/api'; // Modifiez ceci en fonction de l'URL de votre API

  constructor(private http: HttpClient) {}

  // Obtenir tous les matchs
  getMatchs(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/matchs`);
  }

  // Créer un nouveau match
  createMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/matchs`, match);
  }

  // Mettre à jour un match
  updateMatch(id: string, match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/matchs/${id}`, match);
  }

  // Supprimer un match
  deleteMatch(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/matchs/${id}`);
  }

  // Créer un classement
  createClassement(classement: Classement): Observable<Classement> {
    return this.http.post<Classement>('http://localhost:3001/api/classement', classement);
  }

  // Obtenir tous les classements
  getClassements(): Observable<Classement[]> {
    return this.http.get<Classement[]>(`http://localhost:3001/api/classement`);
  }

  // Mettre à jour un classement
  updateClassement(id: string, classement: Classement): Observable<Classement> {
    return this.http.put<Classement>(`${this.apiUrl}/classement/${id}`, classement);
  }

  // Supprimer un classement
  deleteClassement(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3001/api/classement/${id}`);
  }

  // Obtenir tous les entraînements
  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings`);
  }

  // Créer un nouvel entraînement
  createTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(`${this.apiUrl}/trainings`, training);
  }

  // Mettre à jour un entraînement
  updateTraining(id: string, training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.apiUrl}/trainings/${id}`, training);
  }

  // Supprimer un entraînement
  deleteTraining(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/trainings/${id}`);
  }
}
