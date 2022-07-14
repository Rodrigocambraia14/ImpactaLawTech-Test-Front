import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { StoreService } from '../services/store.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { Logout } from '../store/actions/auth.actions';
import { AppState } from '../store/app.states';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  userId: any;

  constructor(private storeService: StoreService,
              private userService: UserService,
              private toastService: ToastService,
              private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.Initializer();
  }

  Initializer()
  {
    this.storeService.getAuth().subscribe((auth) => {
      this.userId = auth.user?.Id;
    });

    interval(1*60*1000)
    .subscribe(() => this.checkUserStatus())
  }

  checkUserStatus()
  {
    this.userService.checkStatus(this.userId).subscribe((res) => {
      if (res.data == 1) //status ativo - ok
        return;
      else if(res.data == 2) //status bloqueado - deslogar
      {
          this.toastService.error('Usuário bloqueado! Desconectando...');
          this.store.dispatch(new Logout());
      }

    })
  }

}
