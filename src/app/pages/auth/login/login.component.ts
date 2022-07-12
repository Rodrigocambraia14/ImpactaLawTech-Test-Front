import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StoreService } from 'src/app/services/store.service';
import { AppState } from 'src/app/store/app.states';
import { Login } from 'src/app/store/actions/auth.actions';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    email: localStorage.getItem(environment.rememberMe),
  };
  loginForm: FormGroup | any;
  returnUrl: string | any;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  login: { username: any; password: any; } | any;
  loginFormFilled: { username: any; password: any; } | any;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.authService.isLoading$!;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.loginForm!.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        this.defaultAuth.username,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50), 
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern(/\d/),
        ]),
      ],
      rememberMe: [false],
    });
  }

  submit() {
    this.submitted = true;

    if(!this.loginForm.valid)
      return;

    this.loginFormFilled = {
      username: this.f['username'].value,
      password: this.f['password'].value,
    };
    
    this.store.dispatch(new Login(this.loginFormFilled));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
