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
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit, OnDestroy {
  registerForm: FormGroup | any;
  returnUrl: string | any;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  submitted: boolean = false;
  registerFormFilled: any;
  userId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
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
      this.userId = auth.user.Id;
    });
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: [
        this.data.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100), 
        ]),
      ],
      email: [
        this.data.email,
        Validators.compose([
          Validators.maxLength(320),
          Validators.minLength(3),
          Validators.email
        ]),
      ],
      status: [
        this.data.status,
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  submit() {
    this.submitted = true;

    if(!this.registerForm.valid)
      return;

    this.registerFormFilled = {
      userId: this.data.id,
      name: this.f['name'].value,
      email: this.f['email'].value,
      status: Number(this.f['status'].value),
    };

    this.userService.update(this.registerFormFilled).subscribe((res) => {
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
