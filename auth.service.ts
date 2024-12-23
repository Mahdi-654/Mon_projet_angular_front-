import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  registerUser(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post('http://localhost:3001/api/users/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError((error) => {
        console.error('Error during registration:', error);
        return throwError(error);
      })
    );
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = 'http://localhost:3001/api/users/login';
    const body = { email, password };
  
    return this.http.post<any>(url, body).pipe(
      tap(response => {
        if (response.token) {
          this.cookieService.set('token', response.token, { secure: false, sameSite: 'Lax' });
          this.cookieService.set('role', response.user.role, { secure: false, sameSite: 'Lax' });
          this.cookieService.set('email', email, { secure: false, sameSite: 'Lax' });
          console.log('Cookies set: token, role, email');
        }
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    this.cookieService.delete('email');
    console.log('Cookies deleted');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  isAdmin(): boolean {
    const role = this.cookieService.get('role');
    console.log('User role:', role); // Cela devrait maintenant afficher "user" ou "admin"
    return role === 'admin';
  }

  isUser(): boolean {
    const role = this.cookieService.get('role');
    return role === 'user';
  }

  getUser(): { email: string; role: string; username: string } | null {
    const role = this.cookieService.get('role');
    const email = this.cookieService.get('email');
    const username = this.cookieService.get('username'); // Récupérez également le nom d'utilisateur

    console.log('Retrieved user from cookies:', { email, role, username }); // Ajoutez cette ligne

    if (role) {
      return { email: email || '', role, username: username || '' }; // Assurez-vous de retourner le nom d'utilisateur
    }
    return null;
  }
}
