import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../_models/category';
import { ChecklistItem } from '../_models/checklist_item';
import { CATEGORY_DATA } from './category.service';

export const CHECKLIST_DATA = [
  { guid: 'aaa-bbb-ccc-ddd', completed: false, description: 'Ir ao oftalmologista', deadline: new Date(), postDate: new Date(),
    category: CATEGORY_DATA.find(x => x.name == 'Saúde') as Category
  },
  { guid: 'aaa-bbb-ccc-ddd', completed: true, description: 'Reunião com o gerente regional', deadline: new Date(), postDate: new Date(),
  category: CATEGORY_DATA.find(x => x.name == 'Trabalho') as Category
  }
];

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor() { }

  public getAllChecklistItems(): Observable<ChecklistItem[]>{
      return of(CHECKLIST_DATA);
  }
}
