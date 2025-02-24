import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { Movie, OmdbMovie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent {
  @Output() moviesSelected = new EventEmitter<Movie[]>();

  searchControl = new FormControl('');
  movies: OmdbMovie[] = [];
  loading = false;
  selectedMovies = new Set<string>();

  displayedColumns: string[] = ['select', 'poster', 'title', 'year'];

  constructor(private movieService: MovieService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        return term ? this.movieService.searchOmdb(term) : [];
      })
    ).subscribe({
      next: (response) => {
        this.movies = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.movies = [];
      }
    });
  }

  toggleSelection(movie: OmdbMovie): void {
    if (this.selectedMovies.has(movie.imdbID)) {
      this.selectedMovies.delete(movie.imdbID);
    } else {
      this.selectedMovies.add(movie.imdbID);
    }

    const selectedMovies = this.movies
      .filter(m => this.selectedMovies.has(m.imdbID))
      .map(m => ({
        title: m.Title,
        year: m.Year,
        poster: m.Poster,
        imdbId: m.imdbID,
        plot: '' // This will be filled by the backend
      }));

    this.moviesSelected.emit(selectedMovies);
  }

  isSelected(movie: OmdbMovie): boolean {
    return this.selectedMovies.has(movie.imdbID);
  }
}