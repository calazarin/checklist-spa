import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor(private httpClient: HttpClient) { }

  public printPfd(): Observable<any>{
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
    };
    return this.httpClient.get<any>(`${environment.apiBaseEndpointUrl}save-documents`, httpOptions);
  }
}
