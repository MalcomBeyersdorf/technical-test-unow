import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from '../services/security.service';

export const authenticationGuard: CanActivateFn = async (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const securityService = inject(SecurityService);
  if (securityService.$userData()) {
    return true;
  }
  return false;
};
