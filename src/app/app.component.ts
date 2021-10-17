import { Component } from '@angular/core';
import { PdfExportService } from './service/pdf-export.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private pdfExporter: PdfExportService){

  }

  public events = [
    { title: 'Se beber não case'},
    { title: 'O poderoso chefão'}
  ];

  public printToPdf(){

    this.pdfExporter.printPfd().subscribe(
      (data: any) => {
        let file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
  }
}
