import { Component } from '@angular/core';
import { AuthModalService } from '../../../core/services/auth.modal.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private authmodal: AuthModalService){

  }
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get displayName(): string {
    const first = localStorage.getItem('firstName');
    const last = localStorage.getItem('lastName');
    return first && last ? `${first} ${last}` : '';
  }

  logout() {
    localStorage.clear();
    window.location.reload(); // ou redirige manuellement si tu préfères
  }
  modalConnexion(){
    this.authmodal.openLogin();
  }
}
