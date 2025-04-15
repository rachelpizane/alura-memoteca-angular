import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {
  pensamentos: Pensamento[] = [
    { conteudo: 'Pensamento 1', autoria: 'Autor 1', modelo: 'modelo1' },
    { conteudo: 'Pensamento 2', autoria: 'Autor 2', modelo: 'modelo2' },
    { conteudo: 'Pensamento 3', autoria: 'Autor 3', modelo: 'modelo3' }
  ];
  exibirPensamentos: boolean = this.pensamentos.length > 0;

  constructor() { }

  ngOnInit(): void {
  }

}
