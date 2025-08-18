import { HttpInterceptorFn } from '@angular/common/http';

export const branchInterceptor: HttpInterceptorFn = (req, next) => {
  const branchId = localStorage.getItem('zawy_active_branch');
  
  if (branchId && !req.url.includes('/auth/')) {
    const branchReq = req.clone({
      setHeaders: {
        'X-Branch-Id': branchId
      }
    });
    return next(branchReq);
  }
  
  return next(req);
};
