import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';
import { Category } from '../_models/category';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = [];

  constructor(private dialog: MatDialog, private categoryService: CategoryService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.loadAllCategories();
  }

  private loadAllCategories(){
    this.categoryService.getAllCategories().subscribe((resp: Category[]) => {
      this.dataSource = resp;
    }, (error: any) => {
      console.log(`Um erro ocorreu para chamar a API ${error}`);
    })
  }

  public editCategory(inputCategory: Category){
    this.dialog.open(CategoryEditComponent, { disableClose: true, data : { editableCategory: inputCategory }
    }).afterClosed().subscribe(resp => {
      if(resp) {
        this.loadAllCategories();
        this.snackBarService.showSnackBar('Categoria editada com successo!', 'OK');
      }
    });

  }

  public deleteCategory(category: Category){
    this.dialog.open(DialogComponent, { disableClose: true, data : {
      msg: 'Você tem certeza que deseja apagar essa categoria?', leftButton: 'Cancelar', rightButton: 'OK'
    }}).afterClosed().subscribe(resp => {
        if(resp) {

          this.categoryService.deleteCategory(category.guid).subscribe(
            (resp: any) => {
              this.loadAllCategories();
              this.snackBarService.showSnackBar('Categoria apagada com successo!', 'OK');
            }, (err: any) => {
              this.snackBarService.showSnackBar('Não é possível apagar a categoria pois está uso por um item de checklist!', 'OK');
            }
          )
        }
    });

  }

  public createNewCategory(){
      this.dialog.open(CategoryEditComponent, { disableClose: true, data : { actionName: 'Criar' }
      }).afterClosed().subscribe(resp => {
        if(resp) {
          this.loadAllCategories();
          this.snackBarService.showSnackBar('Categoria criada com successo!', 'OK');
        }
      });
  }
}
