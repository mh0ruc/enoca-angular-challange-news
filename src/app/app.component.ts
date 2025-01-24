import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomenewsComponent } from "./components/homenews/homenews.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule,RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template:' <router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'app1';
}
