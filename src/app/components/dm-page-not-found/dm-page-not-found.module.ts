import { MatIconModule } from '@angular/material/icon';
/* ANGULAR IMPORTS */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/* LOCAL IMPORTS */
import { DMPageNotFoundComponent } from './dm-page-not-found.component';

@NgModule({
  declarations: [DMPageNotFoundComponent],
  imports: [CommonModule, MatIconModule],
})
export class DMPageNotFoundModule {}
