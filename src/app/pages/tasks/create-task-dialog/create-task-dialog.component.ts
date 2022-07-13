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

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {
  registerForm: FormGroup | any;
  returnUrl: string | any;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];
  submitted: boolean = false;
  registerFormFilled: any;
  userId: any;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toastService: ToastService,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
  ) {
    this.isLoading$ = this.tasksService.isLoading$!;
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
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100), 
        ]),
      ],
      description: [
        null,
        Validators.compose([
          Validators.maxLength(200), 
        ]),
      ],
      priority: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  submit() {
    debugger;
    this.submitted = true;

    if(!this.registerForm.valid)
      return;

    this.registerFormFilled = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      priority: Number(this.f['priority'].value),
      userId: this.userId
    };
    
    this.tasksService.create(this.registerFormFilled).subscribe((res) => {
      if(res.valid)
      {
        this.dialogRef.close(true);
        return this.toastService.success(res.message);
      }
      else 
      {
        this.dialogRef.close(false);
        return this.toastService.error(res.message);
      }
    })
    
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
