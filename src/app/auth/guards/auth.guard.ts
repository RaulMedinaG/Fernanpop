// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getInicioSesion()) {
      return true;
    } else {
      // Redirige al usuario al componente de login si no está autenticado
      this.router.navigate(['auth/']);
      return false;
    }
  }
}
