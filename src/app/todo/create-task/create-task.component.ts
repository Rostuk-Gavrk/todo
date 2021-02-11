import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ITask } from '../interfaces/task.interface';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  @Output() addTaskEmit = new EventEmitter<ITask>();
  @Output() moveToHomePageEmit = new EventEmitter<void>();
  @Input() isShowSpinner: boolean;

  constructor() { }

  public formGroup: FormGroup = new FormGroup({
    taskTitle: new FormControl('', [Validators.required])
  });

  public addTask(): void {
    const inputValue: string = this.formGroup.controls['taskTitle'].value;
    if (Boolean(inputValue)) {
      const taskId: number = Math.floor((Math.random() * (10000 - 1) + 5));
      const newTask: ITask = {
        title: inputValue,
        id: taskId
      }
      this.addTaskEmit.emit(newTask);
      this.clearForm();
    }
  }

  public clearForm(): void {
    this.formGroup.reset();
  }

  public moveToHomePage(): void {
    this.moveToHomePageEmit.emit();
  }
}
