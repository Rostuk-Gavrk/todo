import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { concatMap, delay, tap } from 'rxjs/operators';
import { ITask } from '../interfaces/task.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList$: BehaviorSubject<ITask[]> = new BehaviorSubject([]);
  public taskToDo$: Subject<ITask> = new Subject();
  public isShowTodoListLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public spinner$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private localStorageService: LocalStorageService) {
    this.postTaskToDo();
  }

  public serverResponseEmulation(newTask: ITask, min: number, max: number): Observable<ITask> {
    const delayTime: number = (Math.random() * (max - min) + min) * 1000;
    return of(newTask).pipe(
      delay(delayTime)
    )
  }

  public addTodo(newTask: ITask): void {
    this.taskToDo$.next(newTask);
  }

  public removeTodoItem(todoId: number): Observable<ITask> {
    const todoList: ITask[] = this.todoList$.getValue();
    const removedTaskIndex: number = todoList.findIndex((item: ITask) => item.id === todoId);
    return this.serverResponseEmulation(todoList[removedTaskIndex], 1,2).pipe(
      tap(() => {
        todoList.splice(removedTaskIndex, 1);
        this.localStorageService.setStorageItem('todoListItems', todoList);
        this.todoList$.next(todoList);
        this.isShowTodoListLoader$.next(false);
      })
    )
  }

  public changeTodoItemStatus(todoItem: ITask): Observable<ITask> {
    const todoList: ITask[] = this.todoList$.getValue();
    return this.serverResponseEmulation(todoItem, 1,2).pipe(
      tap(() => {
        todoList.forEach((item: ITask) => {
          if (item.id === todoItem.id) {
            return item.completed = !item.completed;
          }
        });
        this.localStorageService.setStorageItem('todoListItems', todoList);
        this.todoList$.next(todoList);
        this.isShowTodoListLoader$.next(false);
      })
    );
  }

  public postTaskToDo(): void {
    this.taskToDo$.pipe(
      concatMap((newTask: ITask) => this.serverResponseEmulation(newTask, 5, 10)),
    ).subscribe((newTask: ITask) => {
      const todoList: ITask[] = this.todoList$.getValue();
      todoList.push(newTask);
      this.localStorageService.setStorageItem('todoListItems', todoList);
      this.todoList$.next(todoList);
      this.spinner$.next(false);
    });
  }
}
