/* ANGULAR IMPORTS */
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

/* LOCAL IMPORTS */
import { AppService } from './app.service';
import { environment } from 'src/environments/environment';

describe('AppServiceService', () => {
  let service: AppService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a call to an api and return the api configuration', () => {
    const apiBaseUrl = environment.apiBaseUrl;
    const apiKey = environment.apiKey;

    const testData: any = {
      config: 'url/url',
    };

    service.getAPIConfiguration$().subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpTestingController.expectOne(
      `${apiBaseUrl}configuration?api_key=${apiKey}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });
});
