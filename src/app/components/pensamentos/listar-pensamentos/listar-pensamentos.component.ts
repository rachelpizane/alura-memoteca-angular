import { Component, OnInit } from '@angular/core';
import { Modificacao } from 'src/app/interfaces/modificacao';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento/pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {
  pensamentos!: Pensamento[];
  pensamentosFavoritos!: Pensamento[];

  exibirPensamentos!: boolean;
  paginaAtual: number = 1;
  limitePensamentos: number = 3;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favorito: boolean = false;

  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
    this.buscarTodosPensamentos()
  }

  buscarTodosPensamentos(): void {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.favorito = false;

    this.pensamentoService.getByPage(this.paginaAtual, this.limitePensamentos).subscribe((pensamentos: Pensamento[]) => {
      this.pensamentos = pensamentos;
      this.exibirPensamentos = this.pensamentos.length > 0;
    })
  }

  carregarMaisPensamentos(): void {
    this.pensamentoService.getByPage(++this.paginaAtual, this.limitePensamentos, this.filtro, this.favorito).subscribe((novosPensamentos: Pensamento[]) => {
      this.pensamentos.push(...novosPensamentos);
      this.haMaisPensamentos = novosPensamentos.length === this.limitePensamentos;
    });
  }

  filtrarPensamentos(): void {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.pensamentoService.getByPage(this.paginaAtual, this.limitePensamentos, this.filtro, this.favorito).subscribe((pensamentosFiltrados: Pensamento[]) => {
      this.pensamentos = pensamentosFiltrados;
    });
  }

  buscarPensamentosFavoritados(): void {
    this.favorito = true;
    this.pensamentoService.getByPage(this.paginaAtual, this.limitePensamentos, this.filtro, this.favorito).subscribe((pensamentosFiltrados: Pensamento[]) => {
      this.pensamentos = pensamentosFiltrados;
      this.pensamentosFavoritos = pensamentosFiltrados;
    });
  }

  modificarPensamento(modificacao: Modificacao): void {
    const pensamento: Pensamento = modificacao.pensamento;

    switch (modificacao.modificacao) {
      case 'excluir':
        this.excluirPensamento(pensamento);
        break;
      case 'favoritar':
        this.atualizarFavoritoPensamento(pensamento);
        break;
      default:
        console.error('Ação não reconhecida');
        break;
    }
  }

  atualizarFavoritoPensamento(pensamento: Pensamento): void {
    this.pensamentoService.update(pensamento).subscribe(() => {
      this.pensamentosFavoritos.splice(this.pensamentosFavoritos.indexOf(pensamento), 1);
    });
  }

  excluirPensamento(pensamento: Pensamento): void {
    this.pensamentoService.delete(pensamento.id!).subscribe(() => {
      this.buscarTodosPensamentos();
    });
  }



}
