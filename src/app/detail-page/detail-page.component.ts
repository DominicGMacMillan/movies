/* ANGULAR IMPORTS */
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

/* THIRD PART IMPORTS */
import { mergeMap, map, catchError, takeUntil } from 'rxjs/operators';
import { of, combineLatest, ReplaySubject } from 'rxjs';

/* LOCAL IMPORTS */
import { IAPIConfigurationUI, IErrorDisplay } from './../app.types';
import { AppService } from './../app.service';
import { IMovieDetailsUI, ITrailers, IMovieVideoUI } from './detail-page.types';
import { DetailPageService } from './detail-page.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnDestroy, OnInit {
  /**
   * PUBLIC VARIABLES
   */

  /**
   * Displays the loading indicator
   */
  public loading: boolean = false;

  /**
   * The url for the movie poster image
   */
  public imageUrl: string;

  /**
   * Used when there is an issue talking with the API
   */
  public noInfo: IErrorDisplay;

  /**
   * A summary of the movie
   */
  public overview: string;

  /**
   * The rating of the movie out of 10 stars
   */
  public rating: string;

  /**
   * The release year of the movie
   */
  public releaseDate: number;

  /**
   * The length of the movie in minutes
   */
  public runtime: string;

  /**
   * The title of the movie
   */
  public title: string;

  /**
   * A list of trailers for the movie
   */
  public trailerUrls: ITrailers[];

  /**
   * PRIVATE VARIABLES
   */
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _detailPageservice: DetailPageService,
    private _appService: AppService
  ) {}

  /**
   * PUBLIC FUNCTIONS
   */

  /**
   * Kills all subscriptions when the component is destroyed
   */
  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  /**
   * Angular initializer function
   */
  public ngOnInit(): void {
    this._load();
  }

  /**
   * PRIVATE FUNCTIONS
   */

  /**
   * Load function to get and setup initial data
   */
  private _load(): void {
    this.loading = true;
    combineLatest(
      // Get the ID from the url to make an api call to get the movie details
      this._activatedRoute.params.pipe(
        mergeMap((params) => {
          return params?.id
            ? this._detailPageservice.getMovieDetails$(params.id)
            : of({} as unknown as IMovieDetailsUI);
        }),
        // Get the movie trailers and add them to the movie object
        mergeMap((movie: IMovieDetailsUI) => {
          const videos$ = movie?.id
            ? this._detailPageservice.getMovieVideos$(movie.id)
            : of([]);

          return videos$.pipe(
            map((videos) => {
              movie.videos = videos;
              return movie;
            })
          );
        })
      ),
      // get the api configuration for retrieving images
      this._appService.getAPIConfiguration$()
    )
      .pipe(
        takeUntil(this._destroy$),
        catchError((error) => {
          // Make the error friendly for the UI to handle
          switch (error?.status) {
            case 404:
              this.noInfo = {
                message: error?.error?.status_message,
                matIcon: 'theaters',
              };
              break;
            default:
              this.noInfo = {
                message: 'There was an issue processing your request',
                matIcon: 'sentiment_dissatisfied',
              };
          }
          console.error(error);
          return error;
        })
      )
      .subscribe((res: [IMovieDetailsUI, IAPIConfigurationUI]) => {
        const movie: IMovieDetailsUI = res[0];
        const config: IAPIConfigurationUI = res[1];

        this.title = movie?.title;
        this.releaseDate = new Date(movie?.release_date).getUTCFullYear();
        this.runtime = movie?.runtime + ' mins';
        this.rating = movie?.vote_average + '/10';
        this.overview = movie?.overview;
        this.trailerUrls = movie?.videos
          ? this._setupTrailers(movie.videos)
          : [];
        this.imageUrl =
          config.images.secure_base_url + 'w185' + movie?.poster_path;

        this.loading = false;
      });
  }

  /**
   * Creates the trailers objects/urls to make the displaying of that data easier.  This also
   * sorts the trailers from oldest to newest
   * @param videos - the videos to be formatted into trailer objects
   * @returns a list of trailer objects
   */
  private _setupTrailers(videos: IMovieVideoUI[]): ITrailers[] {
    return videos
      .map((video) => {
        return {
          url: `https://www.youtube.com/watch?v=${video.key}`,
          publishedDate: video.published_at,
          name: video.name,
        };
      })
      .sort((a, b) =>
        new Date(a.publishedDate) < new Date(b.publishedDate)
          ? -1
          : new Date(a.publishedDate) > new Date(b.publishedDate)
          ? 1
          : 0
      );
  }
}
