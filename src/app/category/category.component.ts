import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Category } from '../_models/category';

export const CATEGORY_DATA = [
  { name: 'Educação', guid: 'aaa-bbb-ccc-dddd'},
  { name: 'Saúde', guid: 'aaa-bbb-ccc-dddd'},
  { name: 'Trabalho', guid: 'aaa-bbb-ccc-dddd'},
  { name: 'Outros', guid: 'aaa-bbb-ccc-dddd'}
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = CATEGORY_DATA;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public editCategory(category: Category){
    console.log('edit category clicked');
  }

  public deleteCategory(category: Category){
    console.log('delete category clicked');

    this.dialog.open(DialogComponent, { disableClose: true, data : {
      msg: 'Você tem certeza que deseja apagar essa categoria?', leftButton: 'Cancelar', rightButton: 'OK'
    }}).afterClosed().subscribe(resp => {
      console.log('Modal apagar fechada');
    });

  }

  public createNewCategory(){
      console.log('create new category clicked');
  }
}
