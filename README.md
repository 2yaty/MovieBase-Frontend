# Frontend - MovieBase System

## Overview
This is the frontend for the MovieBase System built with **Angular 17**. It provides a dashboard for both Admins and Users to manage and view movies.

## Features
- **Authentication** (JWT-based login for Admin & User)
- **Movie Management** (Admin can add, delete, batch add/delete movies)
- **Movie Search** (Users can search and view movie details)
- **User Ratings** (Users can rate movies)
- **Responsive UI**

## Tech Stack
- **Angular 17**
- **Angular Material**
- **RxJS & State Management**
- **Tailwind CSS**

## Setup Instructions
### Prerequisites
- Install **Node.js 18+**
- Install **Angular CLI**:
  ```bash
  npm install -g @angular/cli
  ```

### Running the Application
1. Clone the repository:
   ```bash
   git clone https://github.com/2yaty/MovieBase-Frontend.git
   cd MovieBase-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8079'
   };
   ```
4. Run the application:
   ```bash
   ng serve
   ```

### Deployment
- Build the project:
  ```bash
  ng build --configuration=production
  ```
- Deploy the `dist/` folder to **Vercel, Netlify, or Firebase Hosting**.

## License
This project is licensed under MIT License.

