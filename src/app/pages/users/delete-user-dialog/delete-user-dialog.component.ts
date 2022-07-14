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
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent implements OnInit, OnDestroy {
  returnUrl: string | any;
  isLoading$: Observable<boolean>;
  private unsubscribe: Subscription[] = [];
  submitted: boolean = false;
  userId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private storeService: StoreService,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
  ) {
    this.isLoading$ = this.userService.isLoading$!;
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

    this.userService.delete(this.data.id).subscribe((res) => {
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

  close() {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
