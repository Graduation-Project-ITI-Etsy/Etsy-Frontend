import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResult } from '../../Models/Accout/login-result';
import { Login } from '../../Models/Accout/login';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AccountApiUrl = environment.AccountApiUrl;

  private tokenKey: string = "token";
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();
  get UserState () : boolean{
    return this.isAuthenticated();
  }
  isAuthenticated() : boolean {
    return this.getToken() !== null;
  }
  getToken() : string | null {
    return localStorage.getItem(this.tokenKey);
  }
  //private baseUrl: string ="http://localhost:5104"
  constructor(private http: HttpClient ,private userService: UserService) { }

 /*  login(login1 : Login) :Observable<LoginResult> {
    const url = `${this.baseUrl}/api/Account/Login`;
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<LoginResult>(url, login1,{headers});
  } */

  init() : void {
    if (this.isAuthenticated())
    this.setAuthStatus(true);
     }
    login(item: Login): Observable<LoginResult> {
    var url = `${this.AccountApiUrl}/Login`;
    return this.http.post<LoginResult>(url, item)
         .pipe(tap(loginResult => {
    if (loginResult.isAuthenticated && loginResult.token) {
    localStorage.setItem(this.tokenKey, loginResult.token);
    this.userService.setUserData(loginResult.customer)
    this.setAuthStatus(true);
           }
         }));
     }
    logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
     }

     
    private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
     }


}
