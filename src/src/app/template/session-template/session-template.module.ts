import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionPageTemplateComponent } from './session-page-template/session-page-template.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SessionPageTemplateComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class SessionTemplateModule {}
