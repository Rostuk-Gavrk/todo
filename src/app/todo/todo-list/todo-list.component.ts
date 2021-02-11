import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ITask } from '../interfaces/task.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit  {
  @Output() moveToCreateTaskPageEmit = new EventEmitter<void>();
  @Output() deleteTodoItemEmit = new EventEmitter<number>();
  @Output() checkboxChangeEmit = new EventEmitter<ITask>();
  @Input() todoList: ITask[];
  @Input() isShowSpinner: boolean;

  constructor() { }

  ngOnInit() {
  }

  public moveToCreateTaskPage(): void {
    this.moveToCreateTaskPageEmit.emit();
  }

  public deleteItem(todoId: number): void {
    this.deleteTodoItemEmit.emit(todoId);
  }

  public checkboxChange(todoItem: ITask): void {
    this.checkboxChangeEmit.emit(todoItem);
  }
}

