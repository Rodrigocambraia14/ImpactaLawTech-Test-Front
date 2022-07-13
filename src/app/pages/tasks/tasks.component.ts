import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { TasksService } from 'src/app/services/tasks.service';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
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
  data: any[] = [];
  items = [];
  dataSource: any;
  dataSource2: any;
  statusEvent: any;
  inputEvent: any;
  agreementType: any;
  status: any;
  userId: any;
  title: any;
  userStatus: any;
  rows: any[] = [];
 
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  expandedElement: any | null;
  mock: any[] = [{
    beginDate: ''
  }]
    fullData: any;
  agreementTypeInput: any;
  statusInput: any;
  createdByInput: any;
  subtitleInput: any;
  isLoading = true;
  titleInput: any;
  enableSearch: boolean = false;
  placetitleInput: any;
  beginDateInput: any;
  endDateInput: any;
  tasks: any[] = [];
  downloadStatus: any[] = [];
  sort: any;
  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService,
    private storeService: StoreService,
    private cd: ChangeDetectorRef
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

  ngAfterViewInit() {
    let o1: Observable<boolean> = this.f['name'].valueChanges;
    let o2: Observable<boolean> = this.f['description'].valueChanges;
    let o3: Observable<boolean> = this.f['status'].valueChanges;
    let o4: Observable<boolean> = this.f['priority'].valueChanges;
    let o5: Observable<boolean> = this.f['createdDate'].valueChanges;
    let o6: Observable<boolean> = this.f['actions'].valueChanges;

    merge(o1, o2, o3, o4).subscribe((v) => {
      this.columnDefinitions[0].hide = !this.f['name'].value;
      this.columnDefinitions[1].hide = !this.f['description'].value;
      this.columnDefinitions[2].hide = !this.f['status'].value;
      this.columnDefinitions[3].hide = !this.f['priority'].value;
      this.columnDefinitions[4].hide = !this.f['createdDate'].value;
    });
  }


  openStatusDialog(data: any) {
    // const dialogRef = this.dialog.open(StatusHighlightDialogComponent, {
    //   height: '330px',
    //   width: '400px',
    //   data: data,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == true) {
    //     this.ngOnInit();
    //     this.applyFilter(this.titleInput, 'title');
    //   }
    // });
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

refresh(){
  this.isLoading = true;
  this.tasksService.list(this.userId).subscribe((res) => {
      this.tasks = res.data;
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
