import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public copywrites = 'Desenvolvido para o curso da Udemy.';

  constructor() { }

  ngOnInit(): void {
  }

}
