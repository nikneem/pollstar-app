import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-page-template',
  templateUrl: './session-page-template.component.html',
  styleUrls: ['./session-page-template.component.scss'],
})
export class SessionPageTemplateComponent implements OnInit {
  public drawerOpened: boolean = true;

  constructor() {
    const storedDrawerState = localStorage.getItem('pollstar-drawer-opened');
    this.drawerOpened = storedDrawerState
      ? storedDrawerState.toLowerCase() === 'true'
      : false;
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    localStorage.setItem(
      'pollstar-drawer-opened',
      this.drawerOpened.toString()
    );
  }

  ngOnInit(): void {}
}
