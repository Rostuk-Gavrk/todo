import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskSmartComponent } from './create-task/create-task.smart.component';
import { TodoListSmartComponent } from './todo-list/todo-list-smart.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListSmartComponent,
  },
  { path: 'create',  component: CreateTaskSmartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
