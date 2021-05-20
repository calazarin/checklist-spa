import { Output, ViewChild } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CategoryService } from '../service/category.service';
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

  public categories!: Category[];

  public checklistForm!: FormGroup;

  @ViewChild(FormGroupDirective) public checklistFormDirective!: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe((resp: Category[]) => {
      this.categories = resp;
      this.buildForm();
    }, (error: any) => {
      console.log(`Um erro ocorreu ao chamar a API ${error}`);
    })


  }

  private buildForm(){
    this.checklistForm = this.formBuilder.group(
      {
        completed: [this.checklistItem != null ? this.checklistItem.completed : false, Validators.required ],
        description: [ this.checklistItem != null ? this.checklistItem.description : '', Validators.required],
        deadline: [ this.checklistItem != null ? new Date(this.checklistItem.deadline) : new Date(), Validators.required],
        category: [ this.checklistItem != null ? this.checklistItem.category : null, Validators.required]
      }
    );

  }

  public clearForm(){
    this.checklistForm.reset();
   // this.checklistFormDirective.resetForm();
  }

  public save(){
    if(this.checklistForm.valid) {
      this.clearForm();
     // this.formCloseEvent.emit(true);
    } else {
      console.log('Invalid form');
    }
  }

  public cancel(){
    this.formCloseEvent.emit(false);
  }
}
