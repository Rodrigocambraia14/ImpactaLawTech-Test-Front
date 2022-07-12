import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../store/app.states';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private getAuthState: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.getAuthState = this.store.select(selectAuthState);
  }

  getAuth() {
    return this.getAuthState;
  }
}
