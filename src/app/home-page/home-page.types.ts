/**
 * Ideally the API Response types would either be a package generated from the API itself, due to time constrainsts they are hard coded in this file
 */

export interface IPopularMoviesAPIResponse {
  page: number;
  results: Array<IPopularMoviesResultsAPIResponse>;
  total_pages: number;
  total_results: number;
}

export interface IPopularMoviesResultsAPIResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * These may seem like the same as the ones above, where they differ is their usages.  The ones above should only be changed with the API, the ones below are for how the UI uses them
 */

export interface IPopularMoviesUI {
  page?: number;
  results?: IPopularMovieResultsUI[];
  total_pages?: number;
  total_results?: number;
}

export interface IPopularMovieResultsUI {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imageURL: string;
}
