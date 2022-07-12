import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.states';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
