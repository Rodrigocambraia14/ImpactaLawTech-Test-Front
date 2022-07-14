import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
})
export class ProfileDialogComponent implements OnInit, OnDestroy {
  registerForm: FormGroup | any;
  returnUrl: string | any;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  submitted: boolean = false;
  registerFormFilled: any;
  userId: any;
  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
  ) {
    this.isLoading$ = this.userService.isLoading$!;
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
      this.user = auth.user;
    });
  }

  initForm() {
    this.registerForm = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern(/\d/),
        ]),
      ],
      newPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern(/\d/),
        ]),
      ],
    });
  }

  submit() {
    this.submitted = true;

    if(!this.registerForm.valid)
      return;

    this.registerFormFilled = {
      userId: this.user.Id,
      password: this.f['password'].value,
      newPassword: this.f['newPassword'].value
    };

    this.userService.changePassword(this.registerFormFilled).subscribe((res) => {
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
