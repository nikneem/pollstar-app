import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSessionPageComponent } from './view-session-page/view-session-page.component';

const routes: Routes = [
  {
    path: 'view',
    children: [
      {
        path: ':id',
        component: ViewSessionPageComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
