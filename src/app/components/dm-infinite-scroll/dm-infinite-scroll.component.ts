/* ANGULAR IMPORTS */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'dm-infinite-scroll',
  templateUrl: './dm-infinite-scroll.component.html',
  styleUrls: ['./dm-infinite-scroll.component.scss'],
})
export class DMInfiniteScrollComponent implements AfterViewInit, OnDestroy {
  /**
   * options for the observer
   */
  @Input() options: object = {};

  /**
   * Event emitted when element is scrolled into view
   */
  @Output() scrolled: EventEmitter<boolean> = new EventEmitter();

  /**
   * The element in html that is obserview as to when its in view
   */
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  /**
   * PUBLIC VARIABLES
   */

  /**
   * Return the navite element
   */
  public get element() {
    return this._host.nativeElement;
  }

  /**
   * PRIVATE VARIABLES
   */

  /**
   * For observing when a particular element is in view
   */
  private _observer: IntersectionObserver;

  constructor(private _host: ElementRef) {}

  /**
   * Called after the view has initialized, calls the intersection function when the observed
   * element enters into view
   */
  public ngAfterViewInit(): void {
    const options = {
      root: this._isHostScrollable() ? this._host.nativeElement : null,
      ...this.options,
    };

    this._observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this._observer.observe(this.anchor.nativeElement);
  }

  /**
   * called when the component is destroyed, kills all subscriptions
   */
  public ngOnDestroy() {
    this._observer.disconnect();
  }

  /**
   * Checks to see if the host element is scrollable, if it is, then make that the root element
   * @returns boolean
   */
  private _isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.element);

    return (
      style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll'
    );
  }
}
