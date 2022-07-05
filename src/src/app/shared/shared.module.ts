import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule, MaterialModule],
  exports: [TranslateModule, MaterialModule],
})
export class SharedModule {}
