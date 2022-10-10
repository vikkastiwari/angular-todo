import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ItemTask } from '../model/tasks';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;

  tasks:ItemTask [] = [];
  inProgress:ItemTask [] = [];
  done:ItemTask [] = [];
  updateIndex!:number;
  isEditEnabled:boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', [Validators.required]],
    })
  }

  drop(event: CdkDragDrop<ItemTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done:false,
    })
  }

  editTask(item:ItemTask, index:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = index;
    this.isEditEnabled = true;
  }
  
  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.updateIndex = -1;
    this.isEditEnabled = false;
    this.todoForm.reset();
  }

  deleteTask(taskIndex:number){
    this.tasks.splice(taskIndex,1);
  }

  deleteInprogress(inprogressIndex:number){
    this.inProgress.splice(inprogressIndex,1);
  }

  deleteDone(doneIndex:number){
    this.done.splice(doneIndex,1);
  }
}
