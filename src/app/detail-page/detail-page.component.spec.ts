/* ANGULAR IMPORTS */
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

/* THIRD PARTY IMPORTS */
import { of, throwError } from 'rxjs';

/* LOCAL IMPORTS */
import { AppService } from './../app.service';
import { DetailPageComponent } from './detail-page.component';
import { DetailPageService } from './detail-page.service';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;

  const mockActiveRoute = {
    params: of({
      id: 1,
    }),
  };
  const detailPageService = jasmine.createSpyObj('DetailPageService', [
    'getMovieDetails$',
    'getMovieVideos$',
  ]);
  const appService = jasmine.createSpyObj('AppService', [
    'getAPIConfiguration$',
  ]);

  let getAPIConfigurationSpy = appService.getAPIConfiguration$.and.returnValue(
    of({
      images: {
        secure_base_url: '/secure/',
      },
    })
  );

  let getMovieDetailsSpy = detailPageService.getMovieDetails$.and.returnValue(
    of({
      id: 1,
      title: 'title',
      release_date: '2000-01-01',
      runtime: '100',
      vote_average: 10,
      overview: 'overview',
      poster_path: '/here',
    })
  );

  let getMovieVideosSpy = detailPageService.getMovieVideos$.and.returnValue(
    of([
      {
        key: '2',
        published_at: '2000-01-02T00:00:00.000Z',
        name: 'Video 2',
      },
      {
        key: '1',
        published_at: '2000-01-01T00:00:00.000Z',
        name: 'Video 1',
      },
    ])
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
      ],
      declarations: [DetailPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActiveRoute },
        { provide: DetailPageService, useValue: detailPageService },
        { provide: AppService, useValue: appService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the services on load', () => {
    expect(getAPIConfigurationSpy).toHaveBeenCalled();
    expect(getMovieDetailsSpy).toHaveBeenCalled();
    expect(getMovieVideosSpy).toHaveBeenCalled();
  });

  it('should set the data appropriately on load', () => {
    // component.ngOnInit();
    // fixture.detectChanges();

    const trailers = [
      {
        url: 'https://www.youtube.com/watch?v=1',
        publishedDate: '2000-01-01T00:00:00.000Z',
        name: 'Video 1',
      },
      {
        url: 'https://www.youtube.com/watch?v=2',
        publishedDate: '2000-01-02T00:00:00.000Z',
        name: 'Video 2',
      },
    ];

    expect(component.title).toEqual('title');
    expect(component.releaseDate).toEqual(2000);
    expect(component.runtime).toEqual('100 mins');
    expect(component.rating).toEqual('10/10');
    expect(component.overview).toEqual('overview');
    expect(component.trailerUrls).toEqual(trailers);
    expect(component.imageUrl).toEqual('/secure/w185/here');
  });

  it('should handle errors gracefully', () => {
    const detailPageServiceError = jasmine.createSpyObj('DetailPageService', [
      'getMovieDetails$',
      'getMovieVideos$',
    ]);
    const appServiceError = jasmine.createSpyObj('AppService', [
      'getAPIConfiguration$',
    ]);

    let getAPIConfigurationErrorSpy =
      appServiceError.getAPIConfiguration$.and.returnValue(of({}));

    let getMovieDetailsErrorSpy =
      detailPageServiceError.getMovieDetails$.and.returnValue(
        throwError('Hello world!')
      );

    let getMovieVideosErrorSpy =
      detailPageServiceError.getMovieVideos$.and.returnValue(of([]));

    TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [
          MatProgressSpinnerModule,
          MatIconModule,
          MatToolbarModule,
          MatListModule,
        ],
        declarations: [DetailPageComponent],
        providers: [
          { provide: ActivatedRoute, useValue: mockActiveRoute },
          { provide: DetailPageService, useValue: detailPageServiceError },
          { provide: AppService, useValue: appServiceError },
        ],
      })
      .compileComponents();

    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getMovieDetailsErrorSpy).toHaveBeenCalled();
    expect(getAPIConfigurationErrorSpy).toHaveBeenCalled();
    expect(getMovieVideosErrorSpy).not.toHaveBeenCalled();
    expect(component.noInfo).toBeDefined();
  });
});
