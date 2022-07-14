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
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    imageProfile: new FormControl(true),
    name: new FormControl(true),
    userName: new FormControl(true),
    email: new FormControl(true),
    status: new FormControl(true),
    createdDate: new FormControl(true),
    lastLogin: new FormControl(true),
    tasks: new FormControl(true),
    actions: new FormControl(true),
  });
  user: any;

 get f() {
    return this.form.controls;
  }
  columnDefinitions = [
    { def: 'imageProfile', label: 'Avatar', hide: !this.f['imageProfile'].value },
    { def: 'name', label: 'Nome', hide: !this.f['name'].value },
    { def: 'userName', label: 'Usuário', hide: !this.f['userName'].value },
    { def: 'email', label: 'Email', hide: !this.f['email'].value },
    { def: 'status', label: 'Status', hide: !this.f['status'].value },
    { def: 'createdDate', label: 'Data de criação', hide: !this.f['createdDate'].value },
    { def: 'lastLogin', label: 'Último acesso', hide: !this.f['lastLogin'].value },
    { def: 'tasks', label: 'Tarefas criadas', hide: !this.f['tasks'].value },
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

      if(this.user.RoleName != "Admin")
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
  const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.ngOnInit();
      }
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      height: '500px',
      width: '600px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.ngOnInit();
      }
    });
  }

  openDeleteDialog(data:any) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      height: '450px',
      width: '550px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.ngOnInit();
      }
    });
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

setName(name: string)
{
  let nameArray = name.split(" ");
  return `${nameArray[0]} ${nameArray[nameArray.length - 1]}`;
}

}
