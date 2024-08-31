import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SecurityService } from '../services/security.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const securityService = inject(SecurityService);
  const headers = {
    req_uuid: (Date.now() + Math.random()).toString(),
    Authorization: '',
    'Accept-Language': 'es',
  };
  if (securityService.$token()) {
    headers['Authorization'] = `Bearer ${securityService.$token()}`;
    req = req.clone({ setHeaders: headers });
  }
  return next(req);
};
