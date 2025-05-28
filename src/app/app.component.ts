
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProfileComponent } from './shared/components/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, RouterModule,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'catmash-client';
}
