import { Component, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento/pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {
  pensamentos!: Pensamento[];
  exibirPensamentos!: boolean;
  paginaAtual: number = 1;
  limitePensamentos: number = 2;
  haMaisPensamentos: boolean = true;
  filtro: string = '';

  constructor(private pensamentoService : PensamentoService) { }

  ngOnInit(): void {
    this.buscarTodosPensamentos()
  }

  buscarTodosPensamentos(): void {
    this.pensamentoService.getByPage(this.paginaAtual, this.limitePensamentos).subscribe((pensamentos : Pensamento[]) => {
      this.pensamentos = pensamentos;
      this.exibirPensamentos = this.pensamentos.length > 0;
    })
  }

  excluirPensamento(pensamento: Pensamento): void {
    this.pensamentoService.delete(pensamento.id!).subscribe(() => {
      this.buscarTodosPensamentos();
    });
  }

  carregarMaisPensamentos(): void {
    this.pensamentoService.getByPage(++this.paginaAtual, this.limitePensamentos, this.filtro).subscribe((novosPensamentos: Pensamento[]) => {
      this.pensamentos.push(...novosPensamentos);
      this.haMaisPensamentos = novosPensamentos.length === this.limitePensamentos;
    });
  }

  filtrarPensamentos(): void {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService.getByPage(this.paginaAtual, this.limitePensamentos, this.filtro).subscribe((pensamentosFiltrados: Pensamento[]) => {
      this.pensamentos = pensamentosFiltrados;
    });
  }
}
