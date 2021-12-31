import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    let token = '' + localStorage.getItem('token');

    if(token != 'null'){      
      // Clone the request to add the new header
      let clonedRequest = req.clone({ headers: req.headers.append('Authorization', token) });
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  
  }
}
