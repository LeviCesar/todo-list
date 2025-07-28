import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.hasValidToken().pipe(
    tap(isValid => {
      if (!isValid) {
        router.navigate(['/auth/login']);
      }
    }),
    map(isValid => isValid)
  );
};
