import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {ITask} from '../interfaces/task.interface';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo-list-smart',
  template: `
    <app-todo-list
      [todoList]="todoList$ | async"
      (moveToCreateTaskPageEmit)="moveToCreateTaskPage()"
      (deleteTodoItemEmit)="deleteTodoItem($event)"
    ></app-todo-list>
  `,
})
export class TodoListSmartComponent implements OnInit{
  public todoList$: BehaviorSubject<ITask[]>;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit() {
    this.todoList$ = this.todoService.todoList$;
  }

  public moveToCreateTaskPage(): void {
    this.router.navigate(['create']);
  }

  public deleteTodoItem(todoId: number): void {
    this.todoService.removeTodoItem(todoId);
    this.snackBar.open(`Task item with id: ${todoId} has been removed`, '', {
      duration: 2000,
    });
  }

}
