/* ANGULAR IMPORTS */
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';

/* LOCAL IMPORTS */
import { DMInfiniteScrollModule } from '../components/dm-infinite-scroll/dm-infinite-scroll.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    DMInfiniteScrollModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
})
export class HomePageModule {}
