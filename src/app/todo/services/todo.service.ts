import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, delay, tap } from 'rxjs/operators';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList$: BehaviorSubject<ITask[]> = new BehaviorSubject([]);
  public isShowTodoListLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public spinner$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public serverResponseEmulation(newTask: ITask, min: number, max: number): Observable<ITask> {
    const delayTime: number = (Math.random() * (max - min) + min) * 1000;
    return of(newTask).pipe(
      delay(delayTime)
    )
  }

  public addTodo(newTask: ITask): Observable<ITask> {
    return of(newTask).pipe(
      concatMap(() => this.serverResponseEmulation(newTask, 10, 5)),
      tap((newTask: ITask) => {
        const todoList: ITask[] = this.todoList$.getValue();
        todoList.push(newTask);
        this.todoList$.next(todoList);
        this.spinner$.next(false);
      })
    );
  }

  public removeTodoItem(todoId: number): Observable<ITask> {
    const todoList: ITask[] = this.todoList$.getValue();
    const removedTaskIndex: number = todoList.findIndex((item: ITask) => item.id === todoId);
    return this.serverResponseEmulation(todoList[removedTaskIndex], 1,2).pipe(
      tap(() => {
        todoList.splice(removedTaskIndex, 1);
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
        this.todoList$.next(todoList);
        this.isShowTodoListLoader$.next(false);
      })
    );
  }
}
