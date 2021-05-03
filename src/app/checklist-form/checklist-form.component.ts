import { Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATEGORY_DATA } from '../category/category.component';
import { Category } from '../_models/category';
import { ChecklistItem } from '../_models/checklist_item';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  @Input() public actionName = 'Editar';
  @Input() public checklistItem!: ChecklistItem;
  @Output() public formCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public categories: Category[] = CATEGORY_DATA;

  public checklistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.checklistForm = this.formBuilder.group(
      {
        completed: [this.checklistItem != null ? this.checklistItem.completed : false, Validators.required ],
        description: [ this.checklistItem != null ? this.checklistItem.description : '', Validators.required],
        deadline: [ this.checklistItem != null ? new Date(this.checklistItem.deadline) : new Date(), Validators.required],
        category: [ this.checklistItem != null ? this.checklistItem.category : null, Validators.required]
      }
    );

  }

  public save(){
      this.formCloseEvent.emit(true);
  }

  public cancel(){
    this.formCloseEvent.emit(false);
  }
}
