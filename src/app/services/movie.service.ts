import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie,OmdbMovie, OmdbSearchResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private readonly API_URL = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getMovie(id: number) : Observable<OmdbMovie> {
    const params = new HttpParams().set('id', id);
    return this.http.get<OmdbMovie>(`${this.API_URL}/omdb/details`, { params });
  }
  searchOmdb(title: string): Observable<OmdbMovie[]> {
    const params = new HttpParams().set('title', title);
    return this.http.get<OmdbMovie[]>(`${this.API_URL}/omdb/search`, { params });
  }

  getAllMovies(page: number = 0, size: number = 10): Observable<{ content: Movie[], totalElements: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{ content: Movie[], totalElements: number }>(`${this.API_URL}/movies`, { params });
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.API_URL}/movies/`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/movies/${id}`);
  }

  batchAddMovies(movies: Movie[]): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${this.API_URL}/movies/batch-add`, movies);
  }

  batchDeleteMovies(ids: number[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/movies/batch-delete`, { body: ids });
  }
}