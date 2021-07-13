import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChecklistItem } from '../_models/checklist_item';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private httpClient: HttpClient) { }

  public getAllChecklistItems(): Observable<ChecklistItem[]>{
      return this.httpClient.get<ChecklistItem[]>(`${environment.apiBaseEndpointUrl}checklist-items`);
  }

  public saveChecklistItem(checklistItem: ChecklistItem): Observable<string>{
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  public updateChecklistItems(checklistItem: ChecklistItem) : Observable<void>{
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  public deleteChecklistItem(guid: string): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}checklist-items/${guid}`);
  }

  public updateCompleteStatus(guid: string, status: boolean) : Observable<void>{
    return this.httpClient.patch<void>(`${environment.apiBaseEndpointUrl}checklist-items/${guid}`, { isComplete: status});
  }
}
