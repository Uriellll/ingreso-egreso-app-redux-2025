import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'  
})
export class AppComponent implements OnInit {
  
  title = 'ingresoEgresoApp';
  authService = inject((AuthService))
  ngOnInit(): void {
    this.authService.initAuthListener().subscribe(res =>{
      console.log(res);
    }
    )
  }
}
