/* ANGULAR IMPORTS */
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

/* LOCAL IMPORTS */
import { environment } from './../../environments/environment';
import { HomePageService } from './home-page.service';

describe('HomePageService', () => {
  let service: HomePageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a call to an api and return an array of popular movies', () => {
    const apiBaseUrl = environment.apiBaseUrl;
    const apiKey = environment.apiKey;

    const testData: any = [
      {
        title: 'Movie Title',
      },
    ];

    service.getPopularMovies$(1).subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpTestingController.expectOne(
      `${apiBaseUrl}movie/popular?api_key=${apiKey}&page=1`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });
});
