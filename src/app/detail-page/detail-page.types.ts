/**
 * Movie Details API Response
 */

export interface IMovieDetailsAPIResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: ICollectionAPIResponse;
  budget: number;
  genres: IGenresAPIResponse[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompaniesAPIResponse[];
  production_countries: IProductionCountriesAPIResponse[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguagesAPIResponse[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ICollectionAPIResponse {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

export interface IGenresAPIResponse {
  id: number;
  name: string;
}

export interface IProductionCompaniesAPIResponse {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProductionCountriesAPIResponse {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguagesAPIResponse {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/**
 * Movie Details UI Implementation
 */

export interface IMovieDetailsUI {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: ICollectionUI;
  budget: number;
  genres: IGenresAPIResponse[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompaniesUI[];
  production_countries: IProductionCountriesUI[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguagesUI[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  // This one here is added by the UI and not shared with the interface above
  videos?: IMovieVideoUI[];
  vote_average: number;
  vote_count: number;
}

export interface ICollectionUI {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

export interface IGenresUI {
  id: number;
  name: string;
}

export interface IProductionCompaniesUI {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProductionCountriesUI {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguagesUI {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/**
 * Movie Video API Response
 */

export interface IMovieVideosAPIResponse {
  id: number;
  results: IMovieVideoAPIResponse[];
}

export interface IMovieVideoAPIResponse {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

/**
 * Movie Video UI Usage
 */

export interface IMovieVideosUI {
  id: number;
  results: IMovieVideoUI[];
}

export interface IMovieVideoUI {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface ITrailers {
  url: string;
  publishedDate: string;
  name: string;
}
