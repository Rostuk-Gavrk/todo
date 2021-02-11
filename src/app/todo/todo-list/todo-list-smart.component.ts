import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject, of} from 'rxjs';
import {ITask} from '../interfaces/task.interface';
import {LocalStorageService} from '../services/local-storage.service';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-todo-list-smart',
  template: `
    <app-todo-list
      [todoList]="todoList$ | async"
      [isShowSpinner]="isShowSpinner$ | async"
      (moveToCreateTaskPageEmit)="moveToCreateTaskPage()"
      (deleteTodoItemEmit)="deleteTodoItem($event)"
      (checkboxChangeEmit)="checkboxChange($event)"
    ></app-todo-list>
  `,
})
export class TodoListSmartComponent implements OnInit{
  public todoList$: BehaviorSubject<ITask[]>;
  public isShowSpinner$: BehaviorSubject<boolean>;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService
  ) { }

  public ngOnInit() {
    const storageItems: ITask[] = this.localStorageService.getStorageItem('todoListItems');
    if (Array.isArray(storageItems) && Boolean(storageItems.length)) {
      this.todoService.todoList$.next(storageItems);
    }
    this.todoList$ = this.todoService.todoList$;
    this.isShowSpinner$ = this.todoService.isShowTodoListLoader$;
  }

  public moveToCreateTaskPage(): void {
    this.router.navigate(['create']);
  }

  public deleteTodoItem(todoId: number): void {
    this.todoService.isShowTodoListLoader$.next(true);
    this.todoService.removeTodoItem(todoId).subscribe((task: ITask) => {
      this.snackBar.open(`Task item ${task.title} has been removed`, 'success', {
        duration: 2000,
      });
    });
  }

  public checkboxChange(todoItem: ITask): void {
    this.todoService.isShowTodoListLoader$.next(true);
    this.todoService.changeTodoItemStatus(todoItem).subscribe();
  }
}
