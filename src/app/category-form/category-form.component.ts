import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {


  @Input() public actionName = 'Editar';

  public categoryForm!: FormGroup;

  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() public editableCategory!: Category;

  @ViewChild('categoryFormDirective') public categoryFormDirective!: FormGroupDirective;

  public isFormReady = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        name: [this.editableCategory != null ? this.editableCategory.name : '', Validators.required]
    });
    this.isFormReady = true;
  }

  public cancel(){
    console.log('Cancelar clicado');
    this.closeModelEventEmitter.emit(false);
  }

  public save(){
    if(this.categoryForm.valid){
      console.log('Salvar clicado');
      this.clearForm();
  //    this.closeModelEventEmitter.emit(true);
    } else {
      console.log('invalid form');
    }

  }

  public clearForm(){
    this.categoryForm.reset();
    this.categoryFormDirective.resetForm();
  }

}
