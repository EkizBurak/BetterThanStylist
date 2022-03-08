import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BetterThanStylistPageRoutingModule } from './better-than-stylist-routing.module';

import { BetterThanStylistPage } from './better-than-stylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BetterThanStylistPageRoutingModule
  ],
  declarations: [BetterThanStylistPage]
})
export class BetterThanStylistPageModule {}
