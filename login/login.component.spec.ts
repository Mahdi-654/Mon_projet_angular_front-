import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login.component';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let cookieService: CookieService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        CookieService,
        { provide: AuthService, useValue: { loginUser: () => of({ token: 'fakeToken', user: { role: 'user' } }) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should save token and role in cookies on successful login', () => {
    component.email = 'test@example.com';
    component.password = 'password';
    component.loginUser();

    expect(cookieService.get('token')).toBe('fakeToken');
    expect(cookieService.get('role')).toBe('user');
  });
});
