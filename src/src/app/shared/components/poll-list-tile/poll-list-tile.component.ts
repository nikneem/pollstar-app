import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app-state';
import { pollActivate, pollSelect } from 'src/app/state/polls/polls-actions';
import { IPollsListItemDto } from 'src/app/state/polls/polls-models';

@Component({
  selector: 'app-poll-list-tile',
  templateUrl: './poll-list-tile.component.html',
  styleUrls: ['./poll-list-tile.component.scss'],
})
export class PollListTileComponent implements OnInit {
  @Input()
  public poll?: IPollsListItemDto;
  constructor(private store: Store<IAppState>) {}

  public activatePoll(poll: IPollsListItemDto) {
    this.store.dispatch(pollSelect({ id: poll.id }));
  }

  ngOnInit(): void {}
}
