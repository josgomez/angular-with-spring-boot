import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { api_users } from '../static/paths-api';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ username, password }: any): Observable<any> {  
    return this.http.post(api_users.login, { username, password });
  }

  getData(): Observable<any> { 
    return this.http.post(api_users.getData, null);
  }


}