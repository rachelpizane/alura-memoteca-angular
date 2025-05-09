import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento/pensamento.service';
import { minusculoValidator } from 'src/app/util/minusculoValidators';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private pensamentoService: PensamentoService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [0],
      conteudo: ['', Validators.required],
      autoria: ['',[
        Validators.required,
        Validators.minLength(3),
        minusculoValidator
      ]],
      modelo: ['modelo1', [
        Validators.required,
        Validators.pattern('modelo1|modelo2|modelo3')
      ]],
      favorito: [false]
    })
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

  criarPensamento(): void {
    const pensamento: Pensamento = this.formulario.value

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
