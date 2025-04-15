import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {

  pensamentoModelo: any = {
    conteudo: 'Aqui vai o contéudo',
    autoria: 'Aqui vai a autoria',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
