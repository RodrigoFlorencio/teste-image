import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, ResponseUsuario } from '../components/login/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EventEmitter } from 'events';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  urlLogin: 'http://localhost:3002/usuarios/login'

  login: Usuario[]

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  loginUser(email: string, senha: string): Observable<any> {
    const url_api = `http://localhost:3002/usuarios/login`
    return this.http.post(url_api, { email, senha }, { headers: this.headers })
      .pipe(map(data => data))
  }

  setUser(user): void {
    let user_string = JSON.stringify(user)
    localStorage.setItem("currentUser", user_string)
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token)
  }

  getToken() {
    return localStorage.getItem("accessToken")
  }

  getCurrentUser() {
    let user_string = localStorage.getItem("currentUser")
    if (
      user_string) {
      let user = JSON.parse(user_string)
      return user
    } else {
      return null
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem('accessToken')
    const url_api = `http://localhost:3002/usuarios/logout?access_token=${accessToken}`
    localStorage.removeItem("accessToken")
    localStorage.removeItem("currentUser")
    return this.http.post(url_api, { headers: this.headers })
  }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-erro'] : ['msg-success']
    })
  }

}
