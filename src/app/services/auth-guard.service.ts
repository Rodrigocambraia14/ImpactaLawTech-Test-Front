import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  isAuthenticated: boolean = false;
  constructor(public router: Router, private storeService: StoreService) {}
  canActivate(): boolean {
    this.storeService.getAuth().subscribe((auth) => {
      this.isAuthenticated = auth.isAuthenticated;
    });

    if (!this.isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
