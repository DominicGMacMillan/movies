/* ANGULAR IMPORTS */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* LOCAL IMPORTS */
import { DMInfiniteScrollComponent } from './dm-infinite-scroll.component';

@NgModule({
  declarations: [DMInfiniteScrollComponent],
  imports: [CommonModule],
  exports: [DMInfiniteScrollComponent],
})
export class DMInfiniteScrollModule {}
