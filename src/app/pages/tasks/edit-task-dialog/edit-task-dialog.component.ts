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

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit, OnDestroy {
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
    private tasksService: TasksService,
    private toastService: ToastService,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
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
        this.data.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100), 
        ]),
      ],
      description: [
        this.data.description,
        Validators.compose([
          Validators.maxLength(200), 
        ]),
      ],
      priority: [
        this.data.priority,
        Validators.compose([
          Validators.required
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
      id: this.data.id,
      name: this.f['name'].value,
      description: this.f['description'].value,
      priority: Number(this.f['priority'].value),
      status: Number(this.f['status'].value),
      userId: this.userId
    };
    
    this.tasksService.update(this.registerFormFilled).subscribe((res) => {
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
