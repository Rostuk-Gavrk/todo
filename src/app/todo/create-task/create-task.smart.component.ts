import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {ITask} from '../interfaces/task.interface';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'app-create-task-smart',
  template: `
    <div class="create-task-wrap">
      <app-create-task
        [isShowSpinner]="spinner$ | async"
        (addTaskEmit)="addTask($event)"
        (moveToHomePageEmit)="moveToHomePage()"
      ></app-create-task>
    </div>
  `,
  styles: [`
    .create-task-wrap {
      width: 90%;
      margin: 0 auto;
    }
  `]
})
export class CreateTaskSmartComponent implements OnInit{
  public spinner$: BehaviorSubject<boolean>;

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.spinner$ = this.todoService.spinner$;
  }

  public addTask(newTask: ITask): void {
    this.todoService.spinner$.next(true);
    this.todoService.addTodo(newTask);
  }

  public moveToHomePage(): void {
    this.router.navigate(['/']);
  }
}
