import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    // default route for not authorized
    this.alertify.error('Not authorized');
    this.router.navigate(['/home']);
    return false;
  }
}
