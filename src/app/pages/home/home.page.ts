import { Component, OnInit } from '@angular/core';
import { TaskStatus, UserStatus } from 'src/app/enumerators/enums.component';
import { StoreService } from 'src/app/services/store.service';
import { TasksService } from 'src/app/services/tasks.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  user: any;
  users: any[] = [];
  tasks: any[] = [];
  readyTasks: any[] = [];
  onGoingTasks: any[] = [];
  doneTasks: any[] = [];
  deletedTasks: any[] = [];
  blockedUsers: any[]= [];
  activeUsers: any[]= [];

  constructor(private storeService: StoreService,
              private userService: UserService,
              private taskService: TasksService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.Initializer();
  }

  Initializer() {
    this.storeService.getAuth().subscribe((auth) => {
      this.user = auth.user;

      if(this.user.RoleName == 'Admin')
      {
        this.getUsers();
        this.getTasks();
      }
      else
        this.getTasks(this.user.Id);
    });
  }

  getUsers()
  {
    this.userService.list().subscribe((res) => {
      if(res.valid)
      {
        this.users = res.data;
        this.activeUsers = this.tasks.filter((x: any) => x.status == UserStatus.Active);
        this.blockedUsers = this.tasks.filter((x: any) => x.status == UserStatus.Blocked);
      }
      else 
        return this.toastService.error(res.data.errors);
    })
  }

  getTasks(userId? :any)
  {
    this.taskService.list(userId).subscribe((res) => {
      if(res.valid)
      {
        this.tasks = res.data;
        this.readyTasks = this.tasks.filter((x: any) => x.status == TaskStatus.Ready);
        this.onGoingTasks = this.tasks.filter((x: any) => x.status == TaskStatus.Doing);
        this.doneTasks = this.tasks.filter((x: any) => x.status == TaskStatus.Done);
        this.deletedTasks = this.tasks.filter((x: any) => x.status == TaskStatus.Deleted);
      }
      else 
        return this.toastService.error(res.data.errors);
    })
  }

}
