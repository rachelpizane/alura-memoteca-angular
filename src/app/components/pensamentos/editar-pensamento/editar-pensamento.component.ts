import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento/pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(private pensamentoService: PensamentoService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
    if (id) {
      this.buscarPensamento(id);
    }
  }

  buscarPensamento(id: number) {
    this.pensamentoService.getById(id).subscribe((pensamento: Pensamento) => {
      this.pensamento = pensamento;
    });
  }

  editarPensamento() {
    this.pensamentoService.update(this.pensamento).subscribe(() => {
      this.router.navigate(['/listar-pensamentos']);
    });
  }

  cancelarEdicao() {
    this.router.navigate(['/listar-pensamentos']);
  }
}
