import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreService } from 'src/app/services/store.service';
import { Logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.states';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
user: any;
  constructor(private store: Store<AppState>,
              private router: Router,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.Initializer();
  }

  Initializer() {
    this.storeService.getAuth().subscribe((auth) => {
      this.user = auth.user;
    });
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
