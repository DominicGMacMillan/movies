/* ANGULAR IMPORTS */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/* LOCAL IMPORTS */
import { DMInfiniteScrollComponent } from './dm-infinite-scroll.component';

describe('InfiniteScrollComponent', () => {
  let component: DMInfiniteScrollComponent;
  let fixture: ComponentFixture<DMInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DMInfiniteScrollComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the _isHostScrollable function on init', () => {
    const spy = spyOn(component as any, '_isHostScrollable').and.returnValue(
      true
    );
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });
});
