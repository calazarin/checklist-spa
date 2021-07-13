import { Output, ViewChild } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { ChecklistService } from '../service/checklist.service';
import { SnackBarService } from '../service/snack-bar.service';
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

  public categories: Category[] = [];

  public checklistForm!: FormGroup;

  @ViewChild(FormGroupDirective) public checklistFormDirective!: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,
    private checklistService: ChecklistService,  private snackBarService: SnackBarService) { }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe((resp: Category[]) => {
      this.categories = resp;
      this.buildForm();
    }, (error: any) => {
      console.log(`Um erro ocorreu ao chamar a API ${error}`);
    })

  }

  public compareCategories(categoryOne: Category, categoryTwo: Category): boolean{
    return (categoryOne != null && categoryTwo != null) &&
        (categoryOne.guid == categoryTwo.guid) &&
        (categoryOne.name == categoryTwo.name);
  }

  private buildForm(){
    this.checklistForm = this.formBuilder.group(
      {
        isCompleted: [this.checklistItem != null ? this.checklistItem.isCompleted : false, Validators.required ],
        description: [ this.checklistItem != null ? this.checklistItem.description : '', Validators.required],
        deadline: [ this.checklistItem != null ? new Date(this.checklistItem.deadline) : new Date(), Validators.required],
        category: [ this.checklistItem != null ? this.checklistItem.category : null, Validators.required]
      }
    );

  }

  public clearForm(){
    this.checklistForm.reset();
  }

  public save(){
    if(this.checklistForm.valid) {

      if(this.actionName == 'Editar') {

         var updateableItem = {
            guid: this.checklistItem.guid,
            isCompleted: this.checklistForm.value['isCompleted'],
            description: this.checklistForm.value['description'],
            deadline: this.checklistForm.value['deadline'],
            category: this.checklistForm.value['category'],
         };

        this.checklistService.updateChecklistItems(updateableItem as any).subscribe(
          (resp: any) => {
              this.snackBarService.showSnackBar('Item do checklist atualizado com sucesso!', 'OK');
              this.formCloseEvent.emit(true);
          }, (err: any) => {
            this.snackBarService.showSnackBar('Erro ao atualizar item do checklist; tente novamente!', 'OK');
          }
        )

      } else {

        this.checklistService.saveChecklistItem(this.checklistForm.value).subscribe(
          (resp: any) => {
              this.snackBarService.showSnackBar('Item do checklist criado com sucesso!', 'OK');
              this.formCloseEvent.emit(true);
          }, (err: any) => {
            this.snackBarService.showSnackBar('Erro ao criar item do checklist; tente novamente!', 'OK');
          }
        )

      }
    }
  }

  public cancel(){
    this.formCloseEvent.emit(false);
  }
}
