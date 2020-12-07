import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.load();
    this.takeUser()
  }

  usuario;
  takeUser() {
    this.usuario = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logoutUser()
    this.router.navigate(['/']).then(nav => {
      window.location.reload();
    });
  }

  load() {
    const HAS_RELOAD = 'HAS_RELOAD';  // Ao invés de passar a string 'hasRealod' diretamente é melhor criar uma constante para evitar erros de digitação
    const hasReload = sessionStorage.getItem(HAS_RELOAD);
    if (!hasReload) {
      sessionStorage.setItem(HAS_RELOAD, 'true');
      location.reload();
    }
  }
  

}
