/* ANGULAR IMPORTS */
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* THIRD PARTY IMPORTS */
import { filter, map, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /* PUBLIC VARIABLES */

  /**
   * The url to nagigae to when the back button is clicked
   */
  public backButtonURL: string | undefined;

  /**
   * The title of the current page (eg. Popular Movies, Movie Details, etc)
   */
  public title: string | undefined;

  /* PRIVATE VARIABLES */

  /**
   * Used to kill observable subscriptions on componet destroy
   */
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  /**
   * PUBLIC FUNCIONS
   */

  /**
   * Called when the component is destroyed, kills any active subscriptions
   */
  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  /**
   * Called when the component initialized, calls a load function
   */
  public ngOnInit(): void {
    this._load();
  }

  /**
   * Loads the component data.  This listens to the router and retrieves the routing data to set
   * both the title and the navigation
   */
  private _load(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;

          let data: { title?: string; backButtonURL?: string } = {};

          data.title = child?.snapshot.data['title']
            ? child.snapshot.data['title']
            : '';
          data.backButtonURL = child?.snapshot.data['backButtonURL']
            ? child.snapshot.data['backButtonURL']
            : '';

          return data;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((response: { title?: string; backButtonURL?: string }) => {
        this.title = response.title;
        this.backButtonURL = response.backButtonURL;
      });
  }
}
