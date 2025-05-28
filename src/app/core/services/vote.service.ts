import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatDto } from '../dtos/catdto';
import { VoteRequest } from '../dtos/voterequest';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class VoteService {


  constructor(private http: HttpClient) { }

  getRandomPair(): Observable<CatDto[]> {
    return this.http.get<CatDto[]>(`${environment.apiUrl}/Leaderboard/random`);
  }

  vote(request: VoteRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/Vote`, request);
  }
}
