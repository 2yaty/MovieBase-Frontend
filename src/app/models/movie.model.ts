export interface Movie {
  id?: number;
  title: string;
  year: string;
  poster: string;
  plot: string;
  imdbId: string;
  rating?: number;
}

export interface OmdbSearchResponse {
  Search: OmdbMovie[];
  totalResults: string;
  Response: string;
}

export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
}