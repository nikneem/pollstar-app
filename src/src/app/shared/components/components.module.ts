import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSessionComponent } from './create-session/create-session.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PollsListComponent } from './polls-list/polls-list.component';
import { PollListTileComponent } from './poll-list-tile/poll-list-tile.component';
import { PollsDetailsDialogComponent } from './polls-details-dialog/polls-details-dialog.component';
import { JoinSessionComponent } from './join-session/join-session.component';

@NgModule({
  declarations: [CreateSessionComponent, PollsListComponent, PollListTileComponent, PollsDetailsDialogComponent, JoinSessionComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, MaterialModule],
  exports: [PollsListComponent],
})
export class ComponentsModule {}
