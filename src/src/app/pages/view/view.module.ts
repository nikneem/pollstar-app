import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewSessionPageComponent } from './view-session-page/view-session-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [ViewSessionPageComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    RouterModule,
    NgApexchartsModule,
  ],
})
export class ViewModule {}
