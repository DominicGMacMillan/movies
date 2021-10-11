/* ANGULAR IMPORTS */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* THIRD PARTY IMPORTS */
import { Observable } from 'rxjs';
import { refCount, publishReplay } from 'rxjs/operators';

/* LOCAL IMPORTS */
import { environment } from 'src/environments/environment';
import { IAPIConfigurationUI, IAPIConfigurationAPIResponse } from './app.types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  /**
   * PRIVATE VARIABLES
   */

  /**
   * The base url for the movies db api
   */
  private _apiBaseUrl: string = environment.apiBaseUrl;

  /**
   * The custom key for the movies db api
   */
  private _apiKey: string = environment.apiKey;

  constructor(private _http: HttpClient) {}

  /**
   * PUBLIC FUNCTIONS
   */

  /**
   * Get the api config to help retrieve images for the movies db api
   * @returns Observable<IAPIConfigurationUI>
   */
  public getAPIConfiguration$(): Observable<IAPIConfigurationUI> {
    return (
      this._http
        .get<IAPIConfigurationAPIResponse>(
          `${this._apiBaseUrl}configuration?api_key=${this._apiKey}`
        )
        // For caching the response since this will be called a lot
        .pipe(publishReplay(1), refCount())
    );
  }
}
