import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionManageComponent } from './session-manage/session-manage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SessionTemplateModule } from 'src/app/template/session-template/session-template.module';

@NgModule({
  declarations: [SessionManageComponent],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    SessionTemplateModule,
    SharedModule,
    RouterModule,
  ],
})
export class SessionsModule {}
