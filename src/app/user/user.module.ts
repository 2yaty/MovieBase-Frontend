import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlider } from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieGridComponent } from './movie-grid/movie-grid.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    MovieDetailsComponent,
    MovieGridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlider,
    MatSliderModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: UserDashboardComponent,
        children: [
          { path: '', component: MovieGridComponent },
          { path: 'movie/:id', component: MovieDetailsComponent }
        ]
      }
    ])
  ]
})
export class UserModule { }