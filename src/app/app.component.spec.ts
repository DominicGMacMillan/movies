/* ANGULAR IMPORTS */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

//* THIRD PARTY IMPORTS */
import { of } from 'rxjs';

/* LOCAL IMPORTS */
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockActiveRoute = {
    params: of({}),
  };
  const mockRouter: any = {
    events: of(new NavigationEnd(1, '/', '/')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule],
      declarations: [AppComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActiveRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should define the title and backButton', () => {
    expect(app.title).toBeDefined();
    expect(app.backButtonURL).toBeDefined();
  });
});
