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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
    email: localStorage.getItem(environment.rememberMe),
  };
  registerForm: FormGroup | any;
  returnUrl: string | any;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  login: { username: any; password: any; name: any; email: any;} | any;
  registerFormFilled: { username: any; password: any; name: any; email: any;} | any;
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
    return this.registerForm!.controls;
  }

  initForm() {
    this.registerForm = this.fb.group({
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
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      rememberMe: [false],
    });
  }

  submit() {
    this.submitted = true;

    if(!this.registerForm.valid)
      return;

    this.registerFormFilled = {
      username: this.f['username'].value,
      password: this.f['password'].value,
      name: this.f['name'].value,
      email: this.f['email'].value
    };

    this.authService.Register(this.registerFormFilled).subscribe((res) => {
      if(res.valid)
        return this.toastService.success(res.message);
      else {
        return this.toastService.error(res.data.errors);
      }
    })
    
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
