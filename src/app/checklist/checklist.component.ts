import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistService } from '../service/checklist.service';
import { SnackBarService } from '../service/snack-bar.service';
import { ChecklistItem } from '../_models/checklist_item';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  public dataSource!: ChecklistItem[];

  public displayedColumns: string[] = ['id', 'completed', 'description', 'deadline', 'postDate', 'category', 'actions'];

  constructor(private dialog: MatDialog, private checklistService: ChecklistService, private snackBarService: SnackBarService) { }

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

      if(resp){
        this.snackBarService.showSnackBar('Item do checklist criado com sucesso!', 'OK');
      }
    });

  }

  public deleteChecklistItem(checklistItem: ChecklistItem){
    console.log('deletando item do checklist');

    this.dialog.open(DialogComponent, { disableClose: true,
      data: { msg: 'Você deseja realmente apagar esse item?', leftButton: 'Cancelar', rightButton: 'Ok' }
    }).afterClosed().subscribe(resp => {

      console.log('Janela modal confirmar apagar fechada');

      if(resp){
        this.snackBarService.showSnackBar('Item do checklist apagado com sucesso!', 'OK');
      }

    });

  }

  public updateChecklistItem(checklistItem: ChecklistItem){
    console.log('atualizando item do checklist');

    this.dialog.open(ChecklistEditComponent, {
      disableClose: true, data: { updatableChecklistItem: checklistItem, actionName: 'Editar' },
    }).afterClosed().subscribe( resp => {
      console.log('Fechando modal de edição');


      if(resp){
        this.snackBarService.showSnackBar('Item do checklist editado com sucesso!', 'OK');
      }

    });
  }

}
