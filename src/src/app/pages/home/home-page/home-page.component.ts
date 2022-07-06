import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSessionComponent } from 'src/app/shared/components/create-session/create-session.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  createSession() {
    this.dialog.open(CreateSessionComponent);
  }

  ngOnInit(): void {}
}
