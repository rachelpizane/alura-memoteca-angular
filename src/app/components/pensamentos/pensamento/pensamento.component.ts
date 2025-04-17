import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modificacao } from 'src/app/interfaces/modificacao';
import { Pensamento } from 'src/app/interfaces/pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento!: Pensamento;
  @Output() emissaoModificarPensamento = new EventEmitter<Modificacao>();

  modificacao: Modificacao = {
    modificacao: '',
    pensamento: this.pensamento
  }

  constructor() { }
  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length > 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  emitirExcluirPensamento(): void {
    this.modificacao.modificacao = "excluir";
    this.modificacao.pensamento = this.pensamento;

    this.emissaoModificarPensamento.emit(this.modificacao);
  }

  mudarIconeFavorito(): string {
    return this.pensamento.favorito ? 'ativo' : 'inativo';
  }

  emitirAtualizarFavoritoPensamento(): void {
    this.pensamento.favorito = !this.pensamento.favorito;

    this.modificacao.modificacao = "favoritar";
    this.modificacao.pensamento = this.pensamento;

    this.emissaoModificarPensamento.emit(this.modificacao);
  }
}
