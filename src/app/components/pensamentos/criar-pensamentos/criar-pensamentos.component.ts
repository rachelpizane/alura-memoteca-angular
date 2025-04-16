import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento/pensamento.service';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  pensamentoModelo: Pensamento = {
    conteudo: 'Aqui vai o conteúdo',
    autoria: 'Aqui vai a autoria',
  }

  constructor(private pensamentoService: PensamentoService, private router: Router) { }

  ngOnInit(): void {
  }

  criarPensamento(pensamento: Pensamento): void {
    this.pensamentoService.getAll().subscribe((pensamentos: Pensamento[]) => {
      pensamento.id = pensamentos.length + 1;
    })

    this.pensamentoService.save(pensamento).subscribe(() => {
      this.router.navigate(['/listar-pensamentos']);
    });
  }

  cancelarPensamento(event: Event): void {
    event.preventDefault();
    alert("Pensamento cancelado com sucesso!")
    console.log(event)
  }
}
