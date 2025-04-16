import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento!: Pensamento;
  @Output() emissaoExcluirPensamento = new EventEmitter<Pensamento>();

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
    this.emissaoExcluirPensamento.emit(this.pensamento);
  }

}
