/* ANGULAR IMPORTS */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';

/* THIRD PARTY IMPORTS */
import { of, throwError } from 'rxjs';

/* LOCAL IMPORTS */
import { HomePageService } from './home-page.service';
import { HomePageComponent } from './home-page.component';
import { AppService } from '../app.service';
import { DMInfiniteScrollModule } from '../components/dm-infinite-scroll/dm-infinite-scroll.module';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const homePageService = jasmine.createSpyObj('HomePageService', [
    'getPopularMovies$',
  ]);
  const appService = jasmine.createSpyObj('AppService', [
    'getAPIConfiguration$',
  ]);

  let getPopularMoviesSpy = homePageService.getPopularMovies$.and.returnValue(
    of({
      results: [
        {
          id: 1,
          poster_path: '/test1',
        },
        {
          id: 2,
          poster_path: '/test2',
        },
      ],
    })
  );
  let getAPIConfigurationSpy = appService.getAPIConfiguration$.and.returnValue(
    of({
      images: {
        secure_base_url: 'secured/',
      },
    })
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DMInfiniteScrollModule, MatGridListModule],
      declarations: [HomePageComponent],
      providers: [
        { provide: HomePageService, useValue: homePageService },
        { provide: AppService, useValue: appService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call its services on scroll', () => {
    component.onScroll();
    expect(getAPIConfigurationSpy).toHaveBeenCalled();
    expect(getPopularMoviesSpy).toHaveBeenCalled();
  });

  it('should add movies to the movies array on scroll', () => {
    const movies = [
      {
        id: 1,
        poster_path: '/test1',
        imageURL: 'secured/w185/test1',
      },
      {
        id: 2,
        poster_path: '/test2',
        imageURL: 'secured/w185/test2',
      },
    ];

    component.onScroll();
    expect(getAPIConfigurationSpy).toHaveBeenCalled();
    expect(getPopularMoviesSpy).toHaveBeenCalled();
    expect(component.moviesArray).toEqual(movies as any);
  });

  it('should handle errors gracefully', async () => {
    const homePageServiceError = jasmine.createSpyObj('HomePageService', [
      'getPopularMovies$',
    ]);
    const appServiceError = jasmine.createSpyObj('AppService', [
      'getAPIConfiguration$',
    ]);

    let getPopularMoviesErrorSpy =
      homePageServiceError.getPopularMovies$.and.returnValue(
        throwError('hello world')
      );

    let getAPIConfigurationErrorSpy =
      appServiceError.getAPIConfiguration$.and.returnValue(of({}));
    await TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [DMInfiniteScrollModule, MatGridListModule],
        declarations: [HomePageComponent],
        providers: [
          { provide: HomePageService, useValue: homePageServiceError },
          { provide: AppService, useValue: appServiceError },
        ],
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.onScroll();

    expect(getPopularMoviesErrorSpy).toHaveBeenCalled();
    expect(getAPIConfigurationErrorSpy).toHaveBeenCalled();
    expect(component.noInfo).toBeDefined();
  });

  it('should call the colsGenerator function on resize', () => {
    const spy = spyOn(component as any, '_colsGenerator');
    component.onResize({ target: { innerWidth: 576 } });
    expect(spy).toHaveBeenCalled();
  });

  it('should call have 2 cols for an x-small screen', () => {
    component.onResize({ target: { innerWidth: 576 } });
    expect(component.breakpoint).toEqual(2);
  });

  it('should call have 3 cols for a small screen', () => {
    component.onResize({ target: { innerWidth: 768 } });
    expect(component.breakpoint).toEqual(3);
  });

  it('should call have 4 cols for a medium screen', () => {
    component.onResize({ target: { innerWidth: 992 } });
    expect(component.breakpoint).toEqual(4);
  });

  it('should call have 5 cols for a large screen', () => {
    component.onResize({ target: { innerWidth: 1200 } });
    expect(component.breakpoint).toEqual(5);
  });

  it('should call have 6 cols for an x-large screen', () => {
    component.onResize({ target: { innerWidth: 1201 } });
    expect(component.breakpoint).toEqual(6);
  });

  it('should show a smaller row height with a small screen height', () => {
    component.onResize({ target: { innerHeight: 333 } });
    expect(component.rowHeight).toEqual('277px');
  });
  it('should show the default row height with a regular screen height', () => {
    component.onResize({ target: { innerHeight: 335 } });
    expect(component.rowHeight).toEqual('278px');
  });
});
