import { Component, Input, OnInit } from '@angular/core';
import { IPollsListItemDto } from 'src/app/state/session/session-models';

@Component({
  selector: 'app-poll-list-tile',
  templateUrl: './poll-list-tile.component.html',
  styleUrls: ['./poll-list-tile.component.scss'],
})
export class PollListTileComponent implements OnInit {
  @Input()
  public poll?: IPollsListItemDto;
  constructor() {}

  ngOnInit(): void {}
}
