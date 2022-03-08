import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetterThanStylistPage } from './better-than-stylist.page';

const routes: Routes = [
  {
    path: '',
    component: BetterThanStylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetterThanStylistPageRoutingModule {}
