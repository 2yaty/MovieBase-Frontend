import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie.service';
import { RatingService } from '../../services/rating.service';
import { Movie,OmdbMovie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | null = null;
  omdbMovie: OmdbMovie | null = null;
  loading = false;
  userRating: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private ratingService: RatingService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadMovie(params['id']);
      }
    });
  }

  loadMovie(id: number): void {
    this.loading = true;
    this.movieService.getMovie(id).subscribe({
      next: (omdbMovie) => {
        console.log('Movie:', omdbMovie);
        this.omdbMovie = omdbMovie;
        this.movie = {
          imdbId: omdbMovie.imdbID,
          id: id,
          title: omdbMovie.Title,
          year: omdbMovie.Year,
          plot: omdbMovie.Plot,
          poster: omdbMovie.Poster,
        };

        
        this.loadUserRating(id);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load movie details', 'Close', { duration: 3000 });
        this.router.navigate(['/user-dashboard']);
      }
    });
  }

  loadUserRating(movieId: number): void {
    this.ratingService.getUserRating(movieId).subscribe({
      next: (rating) => {
        console.log('Rating:', rating);
        console.log('Rating is null?:', rating === null);
        this.userRating = rating ;
      }
    });
  }

  onRatingChange(rating: number): void {
    if (!this.movie?.id) return;

    const action = this.userRating === null ? 'rateMovie' : 'updateRating';
    this.ratingService[action](this.movie.id, rating).subscribe({
      next: () => {
        this.userRating = rating;
        this.snackBar.open('Rating updated successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to update rating', 'Close', { duration: 3000 });
      }
    });
  }

  deleteRating(): void {
    if (!this.movie?.id) return;

    this.ratingService.deleteRating(this.movie.id).subscribe({
      next: () => {
        this.userRating = null;
        this.snackBar.open('Rating removed successfully', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to remove rating', 'Close', { duration: 3000 });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/user-dashboard']);
  }
}