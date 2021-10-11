/* ANGULAR IMPORTS */
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

/* LOCAL IMPORTS */
import { DetailPageService } from './detail-page.service';
import { environment } from './../../environments/environment';

describe('DetialPageService', () => {
  let service: DetailPageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DetailPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a call to an api and return movie details', () => {
    const apiBaseUrl = environment.apiBaseUrl;
    const apiKey = environment.apiKey;

    const testData: any = {
      title: 'Movie Title',
    };

    service.getMovieDetails$('123').subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpTestingController.expectOne(
      `${apiBaseUrl}movie/123?api_key=${apiKey}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should return any empty array of filter data', () => {
    const apiBaseUrl = environment.apiBaseUrl;
    const apiKey = environment.apiKey;

    const testData: any = [
      {
        title: 'Movie Title',
      },
      {
        testing: 123,
      },
    ];

    service.getMovieVideos$(123).subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = httpTestingController.expectOne(
      `${apiBaseUrl}movie/123/videos?api_key=${apiKey}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should return a filtered official trailers for YouTube list', () => {
    const apiBaseUrl = environment.apiBaseUrl;
    const apiKey = environment.apiKey;

    const testDataInput: any = {
      results: [
        {
          site: 'YouTube',
          type: 'Trailer',
          official: true,
          Title: 'Movie 1',
        },
        {
          site: 'YouTube',
          type: 'Trailer',
          official: false,
          Title: 'Movie 2',
        },
        {
          site: 'YouTube',
          type: 'Clip',
          official: true,
          Title: 'Movie 3',
        },
        {
          site: 'Dailymotion',
          type: 'Trailer',
          official: true,
          Title: 'Movie 4',
        },
        {
          site: 'YouTube',
          type: 'Trailer',
          official: true,
          Title: 'Movie 5',
        },
        {
          site: 'YouTube',
          type: 'Clip',
          official: false,
          Title: 'Movie 6',
        },
      ],
    };
    const testDataOutput: any = [
      {
        site: 'YouTube',
        type: 'Trailer',
        official: true,
        Title: 'Movie 1',
      },
      {
        site: 'YouTube',
        type: 'Trailer',
        official: true,
        Title: 'Movie 5',
      },
    ];

    service.getMovieVideos$(123).subscribe((res) => {
      expect(res).toEqual(testDataOutput);
    });

    const req = httpTestingController.expectOne(
      `${apiBaseUrl}movie/123/videos?api_key=${apiKey}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testDataInput);

    httpTestingController.verify();
  });
});
