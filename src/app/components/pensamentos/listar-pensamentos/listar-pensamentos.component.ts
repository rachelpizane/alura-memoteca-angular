import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modificacao } from 'src/app/interfaces/modificacao';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento/pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {
  titulo: string = 'Meu Mural';
  avisoPensamentos: string = 'Não há pensamentos cadastrados!';

  pensamentos!: Pensamento[];
  pensamentosFavoritos!: Pensamento[];

  exibirPensamentos!: boolean;
  paginaAtual: number = 1;
  limitePensamentos: number = 3;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favorito: boolean = false;

  constructor(private pensamentoService: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosPensamentos()
  }

  recarregarComponente(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url])
  }

  buscarTodosPensamentos(): void {
    this.pensamentoService.getByPage(this.paginaAtual, this.limitePensamentos).subscribe((pensamentos: Pensamento[]) => {
      this.pensamentos = pensamentos;

      this.atualizarExibicaoPensamentos('Não há pensamentos cadastrados!');
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

      this.atualizarExibicaoPensamentos('Não há pensamentos correspondentes ao filtro!');
    });
  }

  buscarPensamentosFavoritados(): void {
    this.titulo = 'Meus Favoritos';
    this.favorito = true;
    this.pensamentoService.getByPage(this.paginaAtual, this.limitePensamentos, this.filtro, this.favorito).subscribe((pensamentosFiltrados: Pensamento[]) => {
      this.pensamentos = pensamentosFiltrados;
      this.pensamentosFavoritos = pensamentosFiltrados;

      this.atualizarExibicaoPensamentos("Não há pensamentos favoritos cadastrados!");
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

      this.atualizarExibicaoPensamentos("Não há pensamentos favoritos cadastrados!");
    });
  }

  excluirPensamento(pensamento: Pensamento): void {
    this.pensamentoService.delete(pensamento.id!).subscribe(() => {
      this.buscarTodosPensamentos();
    });
  }

  atualizarExibicaoPensamentos(avisoPersonalizado: string): void {
    this.exibirPensamentos = this.pensamentos.length > 0;

    if(!this.exibirPensamentos) {
      this.avisoPensamentos = avisoPersonalizado;
    }
  }
}
