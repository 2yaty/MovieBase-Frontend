import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Output() deleteMovies = new EventEmitter<number[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  movies: Movie[] = [];
  totalMovies = 0;
  loading = false;
  selectedMovies = new Set<number>();
  displayedColumns: string[] = ['select', 'poster', 'title', 'year', 'actions'];

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    console.log('Movies:', this.movies);
  }

  loadMovies(page: number = 0): void {
    this.loading = true;
    this.movieService.getAllMovies(page).subscribe({
      next: (response) => {
        this.movies = response.content;
        console.log('Movies:', response.content);
        this.totalMovies = response.totalElements;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load movies', 'Close', { duration: 3000 });
      }
    });
    console.log('Movies:', this.movies);
  }

  onPageChange(event: any): void {
    this.loadMovies(event.pageIndex);
    console.log('Movies:', this.movies);
  }

  toggleSelection(movie: Movie): void {
    if (movie.id) {
      if (this.selectedMovies.has(movie.id)) {
        this.selectedMovies.delete(movie.id);
      } else {
        this.selectedMovies.add(movie.id);
      }
    }
    console.log('Movies:', this.movies);
  }

  isSelected(movie: Movie): boolean {
    return movie.id ? this.selectedMovies.has(movie.id) : false;
  }

  deleteSelected(): void {
    const movieIds = Array.from(this.selectedMovies);
    if (movieIds.length > 0) {
      this.deleteMovies.emit(movieIds);
      this.selectedMovies.clear();
      this.loadMovies(this.paginator.pageIndex);
    }
  }
}