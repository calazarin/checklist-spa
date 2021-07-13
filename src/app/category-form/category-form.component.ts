import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';
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

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,
    private snackbarService: SnackBarService) {

  }

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        name: [this.editableCategory != null ? this.editableCategory.name : '', Validators.required]
    });
    this.isFormReady = true;
  }

  public cancel(){
    this.closeModelEventEmitter.emit(false);
  }

  public save(){

    if(this.categoryForm.valid){

      if(this.actionName == 'Editar') {

        var updatedCategory = {
          guid: this.editableCategory.guid,
          name: this.categoryForm.value['name']
        };

        this.categoryService.updateCategory(updatedCategory)
          .subscribe((resp: any) => {
              this.closeModelEventEmitter.emit(true);
          }, (err: any) => {
            this.snackbarService.showSnackBar('Não foi possível atualizar a categoria. Tente novamente!', 'OK');
          });

      } else {
        this.categoryService.saveCategory(this.categoryForm.value)
        .subscribe((resp: any) => {
            this.closeModelEventEmitter.emit(true);
        }, (err: any) => {
          this.snackbarService.showSnackBar('Não foi possível criar uma categoria. Tente novamente!', 'OK');
        });
      }

    }

  }

  public clearForm(){
    this.categoryForm.reset();
    this.categoryFormDirective.resetForm();
  }

}
