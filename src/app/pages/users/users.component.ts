import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { Route, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    name: new FormControl(true),
    description: new FormControl(true),
    status: new FormControl(true),
    priority: new FormControl(true),
    createdDate: new FormControl(true),
    actions: new FormControl(true),
  });
  user: any;

 get f() {
    return this.form.controls;
  }
  columnDefinitions = [
    { def: 'name', label: 'Nome', hide: !this.f['name'].value },
    { def: 'description', label: 'Descrição', hide: !this.f['description'].value },
    { def: 'status', label: 'Status', hide: !this.f['status'].value },
    { def: 'priority', label: 'Prioridade', hide: !this.f['priority'].value },
    { def: 'createdDate', label: 'Data de criação', hide: !this.f['createdDate'].value },
    { def: 'actions', label: 'Ações', hide: !this.f['actions'].value },
  ];
  
  submitted: boolean = false;
  dataSource: any;
  userId: any;
  rows: any[] = [];
 
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    fullData: any;
  isLoading = true;
  endDateInput: any;
  users: any[] = [];
  sort: any;
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private storeService: StoreService,
    private toastService: ToastService,
    private router: Router,
  ) { }


  ngOnInit(): void{
    this.Initializer();
  }

  Initializer() {
    this.storeService.getAuth().subscribe((auth) => {
      this.user = auth.user;

      if(this.user.roleName != "Admin")
      {
        this.toastService.error('Acesso negado');
        this.router.navigateByUrl('/home');
      }
    });

    this.userService.list().subscribe((res) => {
      this.users = res.data;
      this.fullData = res.data;
      this.isLoading = false;

      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.data = this.users;
      this.dataSource.paginator = this.paginator;
    });
    
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions.filter((x) => !x.hide).map((x) => x.def);
  }

  openCreateDialog(){
  // const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
  //     height: '450px',
  //     width: '600px',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result == true) {
  //       this.ngOnInit();
  //     }
  //   });
  }

  openEditDialog(data: any) {
    // const dialogRef = this.dialog.open(EditTaskDialogComponent, {
    //   height: '500px',
    //   width: '600px',
    //   data: data,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == true) {
    //     this.ngOnInit();
    //   }
    // });
  }

  openDeleteDialog(data:any) {
    // const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
    //   height: '450px',
    //   width: '550px',
    //   data: data,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == true) {
    //     this.ngOnInit();
    //   }
    // });
  }

refresh(){
  this.isLoading = true;
  this.userService.list().subscribe((res) => {
      this.users = res.data;
      this.fullData = res.data;
      this.isLoading = false;
  });
}

setStatus(index: any)
{
  let statusDefinitions = [
    'Pronta',
    'Em andamento',
    'Finalizada'
  ]
  return statusDefinitions[index - 1];
}

}
