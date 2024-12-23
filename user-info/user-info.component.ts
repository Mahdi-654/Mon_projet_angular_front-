import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
    selector: 'app-user-info',
    template: `
        <div *ngIf="user">
            <p>Username: {{ user.username }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Role: {{ user.role }}</p>
        </div>
    `
})
export class UserInfoComponent implements OnInit {
    user: { email: string; role: string; username: string } | null = null;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.user = this.authService.getUser();
    }
}
