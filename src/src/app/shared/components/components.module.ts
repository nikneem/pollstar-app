import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSessionComponent } from './create-session/create-session.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateSessionComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, MaterialModule],
})
export class ComponentsModule {}
