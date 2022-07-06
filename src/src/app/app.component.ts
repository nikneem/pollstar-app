import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IAppState } from './state/app-state';
import { userIdentify } from './state/user/user-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pollstar';
  private userFromLocalStorage?: string;

  constructor(
    private trans: TranslateService,
    private store: Store<IAppState>
  ) {
    trans.use('en');
    const userFromLocalStorage = localStorage.getItem('pollstar-user-id');
    if (userFromLocalStorage) {
      this.userFromLocalStorage = userFromLocalStorage;
    }
  }

  ngOnInit(): void {
    this.store.dispatch(userIdentify({ userId: this.userFromLocalStorage }));
  }
}
