import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionPageTemplateComponent } from 'src/app/template/session-template/session-page-template/session-page-template.component';
import { SessionManageComponent } from './session-manage/session-manage.component';

const routes: Routes = [
  {
    path: 'sessions',
    component: SessionPageTemplateComponent,
    children: [
      {
        path: 'manage/:id',
        component: SessionManageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}
