import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { PagesComponent } from './pages.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
