import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ResponseUsuario, Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: Usuario = {
    email: '',
    senha: ''
  }

  token

  constructor(private authService: AuthService, 
              private router: Router,
              private produtosServices: ProdutosService) { }

  ngOnInit(): void {
  }

  onLogin() {
    return this.authService.loginUser(this.user.email, this.user.senha).subscribe(data => {
      if (this.user.email === this.user.email && this.user.senha === this.user.senha) {
        this.authService.setUser(data['results'][0])
        this.token = data.token
        this.authService.setToken(this.token)
        this.router.navigate(['/home']).then(nav => {
          window.location.reload();
        });
      }

    }, error => console.log(error))
  }

  usuario;
  takeUser() {
    this.usuario = this.authService.getCurrentUser();
    return this.usuario == null  ? false : true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.takeUser()) {
      return true
    }
    this.router.navigate(['/'])
    return false
    
  }
 
}
