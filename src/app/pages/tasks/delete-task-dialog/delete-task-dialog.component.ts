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
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent implements OnInit, OnDestroy {
  returnUrl: string | any;
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];
  submitted: boolean = false;
  userId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private fb: FormBuilder,
    private tasksService: TasksService,
    private toastService: ToastService,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
  ) {
    this.isLoading$ = this.tasksService.isLoading$!;
  }

  ngOnInit(): void {
    this.getAuth();
  }

  getAuth()
  {
    this.storeService.getAuth().subscribe((auth) => {
      this.userId = auth.user.Id;
    });
  }

  submit() {
    this.submitted = true;

    this.tasksService.delete(this.data.id).subscribe((res) => {
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

  close() {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
