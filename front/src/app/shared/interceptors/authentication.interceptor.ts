import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(Service);
  const jwtToken = '';
  const headers = {
    req_uuid: (Date.now() + Math.random()).toString(),
    Authorization: '',
    'Accept-Language': 'es',
  };
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`;
    req = req.clone({ setHeaders: headers });
  }
  return next(req);
};
