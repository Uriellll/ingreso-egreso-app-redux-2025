import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  authService= inject(AuthService);
  router = inject(Router);
  logOut(){
    this.authService.logOut().then(()=>{
      this.router.navigate(['/login'])
    })
  }

}
