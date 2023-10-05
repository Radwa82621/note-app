import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private router: Router) {
    this.userData();
  }
  register(user: any): Observable<any> {
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
      user
    );
  }

  login(user: any): Observable<any> {
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
      user
    );
  }

  userData() {
    const token = localStorage.getItem('userToken');
    if (token) {
      const userData = jwtDecode(token);
      this.user.next(userData);
      this.router.navigate(['home']);
    }
  }
}
