import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {

  pensamento: any = {
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  pensamentoModelo : any = {
    conteudo: 'Aqui vai o conteúdo',
    autoria: 'Aqui vai a autoria',
  }

  constructor() { }

  ngOnInit(): void {
  }

  criarPensamento(): void {
    alert(`Pensamento criado com sucesso! \n\nConteudo: ${this.pensamento.conteudo} \nAutoria: ${this.pensamento.autoria} \nModelo: ${this.pensamento.modelo}`);
  }

  cancelarPensamento(event: Event) : void {
    event.preventDefault();
    alert("Pensamento cancelado com sucesso!")
    console.log(event)
  }
}
