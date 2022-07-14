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
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {
  registerForm: FormGroup | any;
  returnUrl: string | any;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  submitted: boolean = false;
  registerFormFilled: any;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
  ) {
    this.isLoading$ = this.authenticationService.isLoading$!;
  }

  ngOnInit(): void {
    this.getAuth();
    this.initForm();
  }

  get f() {
    return this.registerForm!.controls;
  }

  getAuth()
  {
    this.storeService.getAuth().subscribe((auth) => {
      this.userId = auth.user.Id;
    });
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: [
        null,
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
      type: [
        2,
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  submit() {
    this.submitted = true;

    if(!this.registerForm.valid)
      return;

      this.registerFormFilled = {
        Username: this.f['username'].value,
        Password: this.f['password'].value,
        Name: this.f['name'].value,
        Email: this.f['email'].value,
        UserType: Number(this.f['type'].value),
      };
    
    this.authenticationService.Register(this.registerFormFilled).subscribe((res) => {
      if(res.valid)
      {
        this.dialogRef.close(true);
        return this.toastService.success(res.message);
      }
      else 
      {
        this.dialogRef.close(false);
        return this.toastService.error(res.data.errors);
      }
    })
    
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
