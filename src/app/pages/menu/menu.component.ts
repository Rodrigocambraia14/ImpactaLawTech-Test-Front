import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreService } from 'src/app/services/store.service';
import { Logout } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.states';
import { ProfileDialogComponent } from '../users/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
user: any;
  constructor(private store: Store<AppState>,
              public dialog: MatDialog,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.Initializer();
  }

  Initializer() {
    this.storeService.getAuth().subscribe((auth) => {
      this.user = auth.user;
    });
  }

  openProfileDialog(){
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe((result) => {
       return;
      });
    }

  logout() {
    this.store.dispatch(new Logout());
  }

}
