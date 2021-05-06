import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistService } from '../service/checklist.service';
import { ChecklistItem } from '../_models/checklist_item';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  public dataSource!: ChecklistItem[];

  public displayedColumns: string[] = ['id', 'completed', 'description', 'deadline', 'postDate', 'category', 'actions'];

  constructor(private dialog: MatDialog, private checklistService: ChecklistService) { }

  ngOnInit(): void {
    this.checklistService.getAllChecklistItems().subscribe(
    (resp: ChecklistItem[]) =>  {
      this.dataSource = resp;
    }, (error: any) => {
        console.log(`Ocorreu um erro ao chamar a API: ${error}`);
    });
  }

  public updateCompleteStatus(status: boolean){
    console.log(`status alterado ${status}`);
  }

  public createNewItem(){
    console.log('Criar novo item do checklist clicado!');

    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { actionName: 'Criar' },
    }).afterClosed().subscribe( resp => {
      console.log('Fechando modal de criação');
    });

  }

  public deleteChecklistItem(checklistItem: ChecklistItem){
    console.log('deletando item do checklist');

    this.dialog.open(DialogComponent, { disableClose: true,
      data: { msg: 'Você deseja realmente apagar esse item?', leftButtonLabel: 'Cancelar', rightButtonLabel: 'Ok' }
    }).afterClosed().subscribe(resp => {

      console.log('Janela modal confirmar apagar fechada');

    });

  }

  public updateChecklistItem(checklistItem: ChecklistItem){
    console.log('atualizando item do checklist');

    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { updatableChecklistItem: checklistItem, actionName: 'Editar' },
    }).afterClosed().subscribe( resp => {
      console.log('Fechando modal de edição');
    });
  }

}
