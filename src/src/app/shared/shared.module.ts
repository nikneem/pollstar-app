import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule, MaterialModule, ComponentsModule],
  exports: [TranslateModule, MaterialModule, ComponentsModule],
})
export class SharedModule {}
