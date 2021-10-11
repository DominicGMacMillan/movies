/* ANGULAR IMPORTS */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* THIRD PARTY IMPORTS */
import { Observable, of } from 'rxjs';

/* LOCAL IMPORTS */
import { environment } from 'src/environments/environment';
import { IPopularMoviesAPIResponse, IPopularMoviesUI } from './home-page.types';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  /**
   * PRIVATE VARIABLES
   */

  /**
   * The api base url for the movie db api
   */
  private _apiBaseUrl: string = environment.apiBaseUrl;

  /**
   * The custom key for the api
   */
  private _apiKey: string = environment.apiKey;

  constructor(private _http: HttpClient) {}

  /**
   * PUBLIC FUNCTIONS
   */

  /**
   * Gets the movies based on the page number
   * @param page the page requested for the set of data (1-500)
   * @returns Observable<IPopularMoviesUI>
   */
  public getPopularMovies$(page?: number): Observable<IPopularMoviesUI> {
    return this._http.get<IPopularMoviesAPIResponse>(
      `${this._apiBaseUrl}movie/popular?api_key=${this._apiKey}&page=${page}`
    ) as Observable<IPopularMoviesUI>;
  }
}
