import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { UserLogged } from '../interfaces/userlogged.interface';
import { UserProfile } from '../interfaces/userprofile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  inicioSesion: boolean;
  private urlRegister: string = 'http://localhost:3000/auth/register';
  private urlLogin: string = 'http://localhost:3000/auth/login';
  userLogged!: UserLogged;

  constructor(private http: HttpClient) {
    this.inicioSesion = false;
  }

  get getUser(){
    return {...this.userLogged};
  }

  login(email: string, password: string){

    const body = {
      email: email,
      password: password
    }; 

    

    return this.http.post<UserLogged>(this.urlLogin, body).pipe(
      tap(resp => {
        console.log(resp);
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
          this.userLogged = {
            email: resp.email,
            token: resp.token
          };
        }
        this.inicioSesion = true;
        return of(this.inicioSesion);
      }),
      map(resp => resp !== null && resp !== undefined),
      catchError(err => of(false))
    );
  }

  register(usuario: string, email:string, password: string){

    const body = {
      name: usuario,
      email: email,
      password: password
    };

    
    return this.http.post<UserLogged>(this.urlRegister, body).pipe(
      tap(resp => {
        console.log(resp);
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
          this.userLogged = {
            email: resp.email,
            token: resp.token
          };
        }
        this.inicioSesion = true;
        return of(this.inicioSesion);
      }),
      map(resp => resp !== null && resp !== undefined),
      catchError(err => of(false))
    );

  }

  getInicioSesion(): boolean {
    return this.inicioSesion;
  }

  logOut() {
    this.inicioSesion = false;
  }

  getUserToken(){
    var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
     });     
    return this.http.get<UserProfile>('http://localhost:3000/auth/profile', { headers: reqHeader });
  }
  

}