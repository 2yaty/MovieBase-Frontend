import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {
  movies: Movie[] = [];
  totalMovies = 0;
  loading = false;
  searchControl = new FormControl('');
  currentPage = 0;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 0;
      const searchTerm = this.searchControl.value?.toLowerCase() || '';
      if (searchTerm) {
        const filteredMovies = this.movies.filter(movie => 
          movie.title.toLowerCase().includes(searchTerm)
        );
        this.movies = filteredMovies;
      } else {
        this.loadMovies();
      }
    });
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    const searchTerm = this.searchControl.value;
    
    this.movieService.getAllMovies(this.currentPage).subscribe({
      next: (response) => {
        this.movies = response.content;
        this.totalMovies = response.totalElements;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.loadMovies();
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/user-dashboard/movie', movieId]);
  }
}