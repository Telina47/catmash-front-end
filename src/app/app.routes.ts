import { Routes } from '@angular/router';
import { VotePageComponent } from './features/vote/pages/vote-page/vote-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: VotePageComponent },
    {
        path: 'stats',
        loadComponent: () =>
            import('./features/stats/pages/stats-page/stats-page.component').then(m => m.StatsPageComponent),
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '' } // fallback route
];
