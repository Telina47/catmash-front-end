import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

type TopCount = 5 | 10 | 20;

interface CatScore {
  id: string;
  imageUrl: string;
  score: number;
  wins: number;
  losses: number;
}

interface UserVsGlobalStatsDto {
  topGlobal: CatScore[];
  topUser: CatScore[];
  popularButYouDisagree: CatScore[];
  underratedByOthers: CatScore[];
  agreementRate: number;
  topCount: TopCount;
}

@Component({
  selector: 'app-stats-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {
  private http = inject(HttpClient);

  stats?: UserVsGlobalStatsDto;
  topCount: TopCount = 10;
  viewMode: 'global' | 'user' | 'disagree' | 'underrated' = 'global';

  search = '';
  sortBy: 'score' | 'wins' | 'losses' = 'score';

  tabs: { key: 'global' | 'user' | 'disagree' | 'underrated'; label: string }[] = [
    { key: 'global', label: 'Classement Global' },
    { key: 'user', label: 'Mes Favoris' },
    { key: 'disagree', label: 'Populaires mais je ne les aime pas' },
    { key: 'underrated', label: 'Sous-estimés par les autres' }
  ];
  
  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.http.get<UserVsGlobalStatsDto>(
      `${environment.apiUrl}/UserStats/comparison/${this.topCount}`
    ).subscribe({
      next: res => this.stats = res
    });
  }

  getDisplayedCats(): CatScore[] {
    if (!this.stats) return [];

    const cats = {
      global: this.stats.topGlobal,
      user: this.stats.topUser,
      disagree: this.stats.popularButYouDisagree,
      underrated: this.stats.underratedByOthers
    }[this.viewMode] ?? [];

    const filtered = cats.filter(cat =>
      cat.id.toLowerCase().includes(this.search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'score': return b.score - a.score;
        case 'wins': return b.wins - a.wins;
        case 'losses': return b.losses - a.losses;
        default: return 0;
      }
    });
  }
}
