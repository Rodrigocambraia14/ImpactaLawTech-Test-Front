import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { TaskStatus } from 'src/app/enumerators/enums.component';
import { StoreService } from 'src/app/services/store.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastService } from 'src/app/services/toast.service';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    name: new FormControl(true),
    description: new FormControl(true),
    status: new FormControl(true),
    priority: new FormControl(true),
    createdDate: new FormControl(true),
    finishTask: new FormControl(true),
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
    { def: 'finishTask', label: 'Concluir tarefa', hide: !this.f['finishTask'].value },
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
  tasks: any[] = [];
  sort: any;
  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService,
    private storeService: StoreService,
    private toastService: ToastService
  ) { }


  ngOnInit(): void{
    this.Initializer();
  }

  Initializer() {
    this.storeService.getAuth().subscribe((auth) => {
      this.user = auth.user;

      this.tasksService.list(this.user.Id).subscribe((res) => {
        this.tasks = res.data;
        this.fullData = res.data;
        this.isLoading = false;
  
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.tasks;
        this.dataSource.paginator = this.paginator;
      });
    });
    
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions.filter((x) => !x.hide).map((x) => x.def);
  }

  openCreateDialog(){
  const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      height: '450px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.ngOnInit();
      }
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
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
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
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
  this.tasksService.list(this.user.Id).subscribe((res) => {
      this.tasks = res.data;
      this.fullData = res.data;
      this.isLoading = false;

      this.dataSource = new MatTableDataSource(this.tasks);
      this.dataSource.sort = this.sort;
      this.dataSource.data = this.tasks;
      this.dataSource.paginator = this.paginator;
  });
}

setStatus(index: any)
{
  let statusDefinitions = [
    'Pronta para início',
    'Em andamento',
    'Finalizada'
  ]
  return statusDefinitions[index - 1];
}

updateStatus(checked:any, item: any)
{
  const request = {
    id: item.id,
    name: item.name,
    description: item.description,
    priority: Number(item.priority),
    status: checked ? TaskStatus.Done : TaskStatus.Ready,
    userId: this.user.Id
  };
  
  this.tasksService.update(request).subscribe((res) => {
    if(res.valid)
    {
      this.refresh();
    }
    else 
    {
      return this.toastService.error(res.data.errors);
    }
  })
}

}
