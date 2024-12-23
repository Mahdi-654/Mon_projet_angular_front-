import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Training } from './models/training.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private trainingsSubject = new BehaviorSubject<Training[]>([]);
  trainings$ = this.trainingsSubject.asObservable();
  
  // L'URL de votre API
  private apiUrl = 'http://localhost:3001/api/trainings'; 

  constructor(private http: HttpClient) {}

  // Récupérer les entraînements
  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.apiUrl);
  }

  // Ajouter un entraînement
  addTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(this.apiUrl, training).pipe(
      tap(newTraining => {
        const currentTrainings = this.trainingsSubject.value;
        this.trainingsSubject.next([...currentTrainings, newTraining]);
      })
    );
  }

  // Mettre à jour un entraînement
  updateTraining(training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.apiUrl}/${training._id}`, training).pipe(
      tap(updatedTraining => {
        const currentTrainings = this.trainingsSubject.value;
        const index = currentTrainings.findIndex(t => t._id === updatedTraining._id);
        if (index !== -1) {
          currentTrainings[index] = updatedTraining;
          this.trainingsSubject.next([...currentTrainings]);
        }
      })
    );
  }

  // Supprimer un entraînement
  deleteTraining(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTrainings = this.trainingsSubject.value;
        this.trainingsSubject.next(currentTrainings.filter(t => t._id !== id));
      })
    );
  }
}
