import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private readonly API_URL = `${environment.apiUrl}/api/ratings`;

  constructor(private http: HttpClient) {}

  rateMovie(movieId: number, rating: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}`, { movieId, rating });
  }

  getUserRating(movieId: number): Observable<number | null> {
    return this.http.get<number | null>(`${this.API_URL}/${movieId}`);
  }

  updateRating(movieId: number, rating: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}`, { movieId, rating });
  }

  deleteRating(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${movieId}`);
  }
}