/* ANGULAR IMPORTS */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* THIRD PARTY IMPORTS */
import { Observable, forkJoin, ReplaySubject } from 'rxjs';
import { map, takeUntil, catchError } from 'rxjs/operators';

/* LOCAL IMPORTS */
import { IErrorDisplay } from './../app.types';
import { AppService } from '../app.service';
import { HomePageService } from './home-page.service';
import { IPopularMovieResultsUI, IPopularMoviesUI } from './home-page.types';
import { IAPIConfigurationUI } from '../app.types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  /**
   * PUBLIC VARIABLES
   */

  public breakpoint: number;

  /**
   * Shows when data is being retrieved
   */
  public loading: boolean = false;

  /**
   * The array of movies to display in the grid on the UI
   */
  public moviesArray: IPopularMovieResultsUI[] = [];

  /**
   * For showing error messages on the UI
   */
  public noInfo: IErrorDisplay;

  /**
   * Used for getting the next set of information from the api via their page numbers
   */
  public pageIndex: number = 0;

  /**
   * The row height for the mat grids
   */
  public rowHeight: string;

  /**
   * PRIVATE VARIABLES
   */

  /**
   * The api config retrieved for determining the images urls
   */
  private _config$: Observable<IAPIConfigurationUI>;

  /**
   * Used for ending observables to avoid memory leaks
   */
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private _appService: AppService,
    private _homePageService: HomePageService
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
   * Called when the component is first created, calls the load function
   */
  public ngOnInit(): void {
    this._load();
  }

  /**
   * Called when the user changes their screen size
   * @param event The window resize event
   */
  public onResize(event: any) {
    this.breakpoint = this._colsGenerator(event);
    this.rowHeight = this._rowHeight(event);
  }

  /**
   * Called every time the screen reaches the bottom of the page.  It makes a call to the next page of data
   * to retrieve more movies to show
   */
  public onScroll(): void {
    this.pageIndex++;
    this.loading = true;
    // Get the api config and the next set of popular movies
    forkJoin(
      this._homePageService.getPopularMovies$(this.pageIndex),
      this._config$
    )
      .pipe(
        map((results) => {
          const popularMovies: IPopularMoviesUI = results[0];
          const apiConfig: IAPIConfigurationUI = results[1];
          // Create the post URL for each movie
          if (!!popularMovies?.results)
            popularMovies.results.map((movie) => {
              movie.imageURL =
                apiConfig.images.secure_base_url + 'w185' + movie.poster_path;
              return movie;
            });
          return popularMovies;
        }),
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
            // This is whats returned when the api has no more pages (eg. pageIndex > 500)
            case 422:
              this.loading = false;
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
      .subscribe((res: IPopularMoviesUI) => {
        this.loading = false;
        res.results?.map((movie) => {
          this.moviesArray.push(movie);
        });
      });
  }

  /**
   * PRIVATE FUNCTIONS
   */

  /**
   * Creates an observable of the api configuration data
   */
  private _load(): void {
    window.onresize;
    this.breakpoint = this._colsGenerator();
    this.rowHeight = this._rowHeight();
    this._config$ = this._appService
      .getAPIConfiguration$()
      .pipe(takeUntil(this._destroy$));
  }

  /**
   * Based on the current screen size it will return the number of columns for the grid.
   * This is to generate a responsive design with the MatGrid
   * @param event window resize event
   * @returns number - number of cols
   */
  private _colsGenerator(event?: any): number {
    let width;
    if (!event) {
      width = window.innerWidth;
    } else {
      width = event.target.innerWidth;
    }

    if (width <= 576) {
      return 2;
    }
    if (width <= 768) {
      return 3;
    }
    if (width <= 992) {
      return 4;
    }
    if (width <= 1200) {
      return 5;
    }
    return 6;
  }

  /**
   * If the height of the screen is less than the default row height, then the inifinite scroll doesn't
   * fire, this is a workaround for that very specific senario to reduce the row height so that users
   * will always be able to see movies and not have to scroll to the bottom to view them
   * @param event window resize event
   * @returns row size in px
   */
  private _rowHeight(event?: any): string {
    let height;
    if (!event) {
      height = window.innerHeight;
    } else {
      height = event.target.innerHeight;
    }
    if (height <= 334) {
      return height - 56 + 'px';
    } else {
      return '278px';
    }
  }
}
