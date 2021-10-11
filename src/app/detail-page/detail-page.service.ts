/* ANGULAR IMPORTS */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* THIRD PARTY IMPORTS */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* LOCAL IMPORTS */
import {
  IMovieDetailsUI,
  IMovieVideosAPIResponse,
  IMovieVideoUI,
  IMovieDetailsAPIResponse,
} from './detail-page.types';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DetailPageService {
  /**
   * PRIVATE VARIABLES
   */

  /**
   * The base url for the movies api that we are using
   */
  private _apiBaseUrl: string = environment.apiBaseUrl;

  /**
   * The api key for a particular implementation
   */
  private _apiKey: string = environment.apiKey;

  constructor(private _http: HttpClient) {}

  /**
   * PUBLIC FUNCTIONS
   */

  /**
   * Gets the details of the movie
   * @param id - the id of a particular movie
   * @returns Observable<IMovieDetailsUI>
   */
  public getMovieDetails$(id: string): Observable<IMovieDetailsUI> {
    return this._http.get<IMovieDetailsAPIResponse>(
      `${this._apiBaseUrl}movie/${id}?api_key=${this._apiKey}`
    );
  }

  /**
   * Gets all of the videos associated with a particular movie then filters
   * them down to official trailers on YouTube
   * @param id - the id of a particular movie
   * @returns Observable<IMovieVideoUI[]>
   */
  public getMovieVideos$(id: number): Observable<IMovieVideoUI[]> {
    return this._http
      .get<IMovieVideosAPIResponse>(
        `${this._apiBaseUrl}movie/${id}/videos?api_key=${this._apiKey}`
      )
      .pipe(
        map((videos) => {
          // Only want to show official videos and trailers that are uploaded to youtube
          // Should look into adding more support in the future for other sites
          return videos?.results
            ? videos.results.filter(
                (video) =>
                  video.site === 'YouTube' &&
                  video.type === 'Trailer' &&
                  video.official
              )
            : [];
        })
      );
  }
}
