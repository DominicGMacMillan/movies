/* ANGULAR IMPORTS */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* LOCAL IMPORTS */
import { DetailPageComponent } from './detail-page/detail-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DMPageNotFoundComponent } from './components/dm-page-not-found/dm-page-not-found.component';

const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent,
    data: { title: 'Popular Movies' },
  },
  {
    path: 'detail-page/:id',
    component: DetailPageComponent,
    data: { title: 'Movie Details', backButtonURL: '/home-page' },
  },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: DMPageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
