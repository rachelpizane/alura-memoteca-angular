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
    { conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget consequat magna. Suspendisse potenti. Integer tincidunt, massa quis tincidunt porttitor, nisi risus dictum eros, at pharetra nulla sapien id magna. Duis non pulvinar enim. Etiam imperdiet, nisl non gravida feugiat, lectus nisi laoreet erat, sed feugiat augue mauris sed leo. Aenean vitae odio nec neque faucibus vestibulum. Curabitur tincidunt varius turpis a porta.', autoria: 'Autor 3', modelo: 'modelo3' }
  ];
  exibirPensamentos: boolean = this.pensamentos.length > 0;

  constructor() { }

  ngOnInit(): void {
  }

}
