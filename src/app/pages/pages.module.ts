import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomePage } from './home/home.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuComponent } from './menu/menu.component';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TasksComponent } from './tasks/tasks.component'; 
import { MenuModule } from './menu/menu.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatNativeDateModule, MatOption, MatOptionModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableFilterModule } from 'mat-table-filter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateTaskDialogComponent } from './tasks/create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from './tasks/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './tasks/delete-task-dialog/delete-task-dialog.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomePage,
    TasksComponent,
    CreateTaskDialogComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTableFilterModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class PagesModule { }
