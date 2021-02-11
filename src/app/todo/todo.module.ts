import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CreateTaskSmartComponent} from './create-task/create-task.smart.component';
import {TodoListSmartComponent} from './todo-list/todo-list-smart.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';
import { CreateTaskComponent } from './create-task/create-task.component';


@NgModule({
  declarations: [
    TodoListComponent,
    CreateTaskComponent,
    TodoListSmartComponent,
    CreateTaskSmartComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class TodoModule { }
