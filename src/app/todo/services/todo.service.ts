import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, delay, tap } from 'rxjs/operators';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList$: BehaviorSubject<ITask[]> = new BehaviorSubject([]);
  public spinner$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor() { }

  public saveTodo(newTask: ITask): Observable<ITask> {
    const delayTime: number = (Math.random() * (10 - 5) + 5) * 1000;
    return of(newTask).pipe(
      delay(delayTime)
    )
  }

  public addTodo(newTask: ITask): Observable<ITask> {
    return of(newTask).pipe(
      concatMap(() => this.saveTodo(newTask)),
      tap((newTask: ITask) => {
        const todoList: ITask[] = this.todoList$.getValue();
        todoList.push(newTask);
        this.todoList$.next(todoList);
        this.spinner$.next(false);
      })
    );
  }

  public removeTodoItem(todoId: number): void {
    const todoList: ITask[] = this.todoList$.getValue();
    const removedTaskIndex: number = todoList.findIndex((item: ITask) => item.id === todoId);
    todoList.splice(removedTaskIndex, 1);
    this.todoList$.next(todoList);
  }
}
