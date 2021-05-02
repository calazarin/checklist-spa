import { Component, OnInit } from '@angular/core';
import { CATEGORY_DATA } from '../category/category.component';
import { ChecklistItem } from '../_models/checklist_item';

export const CHECKLIST_DATA = [

  { guid: 'aaa-bbb-ccc-ddd', completed: false, description: 'Ir ao oftalmologista', deadline: Date.now(), postDate: Date.now(),
    category: CATEGORY_DATA.find(x => x.name == 'Saúde')
  },
  { guid: 'aaa-bbb-ccc-ddd', completed: true, description: 'Reunião com o gerente regional', deadline: Date.now(), postDate: Date.now(),
  category: CATEGORY_DATA.find(x => x.name == 'Trabalho')
  }

];

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  public dataSource = CHECKLIST_DATA;

  public displayedColumns: string[] = ['id', 'completed', 'description', 'deadline', 'postDate', 'category', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  public updateCompleteStatus(status: boolean){
    console.log(`status alterado ${status}`);
  }

  public createNewItem(){
    console.log('Criar novo item do checklist clicado!');
  }

  public deleteChecklistItem(checklistItem: ChecklistItem){
    console.log('deletando item do checklist');
  }

  public updateChecklistItem(checklistItem: ChecklistItem){
    console.log('atualizando item do checklist');
  }

}
