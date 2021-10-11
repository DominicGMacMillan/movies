/* ANGULAR IMPORTS */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

/* LOCAL IMPORTS */
import { DMPageNotFoundComponent } from './dm-page-not-found.component';

describe('DmPageNotFoundComponent', () => {
  let component: DMPageNotFoundComponent;
  let fixture: ComponentFixture<DMPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [DMPageNotFoundComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the text in view', () => {
    const test = fixture.debugElement.query(By.css('h1'));
    expect(test.nativeElement.innerText).toEqual('Oh No! Page not Found');
  });
});
