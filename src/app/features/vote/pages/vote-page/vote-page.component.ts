import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatCardComponent } from '../../../../shared/components/cat-card/cat-card.component';
import { VoteService } from '../../../../core/services/vote.service';
import { CatDto } from '../../../../core/dtos/catdto';
import { AuthModalComponent } from '../../../auth/components/auth-modal/auth-modal.component';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-vote-page',
  standalone: true,
  imports: [CommonModule, CatCardComponent, AuthModalComponent],
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss']
})
export class VotePageComponent implements OnInit {
  cats: CatDto[] = [];
  isAuthenticated = false;
  showLoginModal =false;
  showRegisterModal = false; 

  constructor(private voteService: VoteService, private auth: AuthService) { 

  }

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats() {
    this.voteService.getRandomPair().subscribe({
      next: cats => this.cats = cats,
      error: err => console.error('Erreur lors du chargement des chats', err)
    });
  }

  vote(winnerId: string) {
    if (!this.auth.isLoggedIn()) {
      this.showLoginModal = true;
      return;
    }

    const loserId = this.cats.find(c => c.id !== winnerId)?.id;
    if (!loserId) return;

    this.voteService.vote({ WinnerCatId: winnerId, LoserCatId: loserId }).subscribe({
      next: () => this.loadCats()
    });
  }
  openRegister() {
    this.showLoginModal = false;
    this.showRegisterModal = true;
  }

  closeModals() {
    this.showLoginModal = false;
    this.showRegisterModal = false;
  }
}
