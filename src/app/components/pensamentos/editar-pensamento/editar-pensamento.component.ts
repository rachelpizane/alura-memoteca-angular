import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { PensamentoService } from 'src/app/services/pensamento/pensamento.service';
import { minusculoValidator } from 'src/app/util/minusculoValidators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  pensamentoForm!: FormGroup;

  constructor(private pensamentoService: PensamentoService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.pensamentoForm = this.formBuilder.group({
      id: [id],
      conteudo: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(300)])],
      autoria: ['', Validators.compose([Validators.required, minusculoValidator])],
      modelo: ['', Validators.pattern('modelo1|modelo2|modelo3')]
    });

    if (id) {
      this.buscarPensamento(id);
    }
  }

  buscarPensamento(id: number) {
    this.pensamentoService.getById(id).subscribe((pensamento: Pensamento) => {
      this.pensamentoForm.patchValue({
        id: pensamento.id,
        conteudo: pensamento.conteudo,
        autoria: pensamento.autoria,
        modelo: pensamento.modelo
      });
    })
  }

  editarPensamento(): void {
    if (this.pensamentoForm.valid) {
      this.pensamentoService.update(this.pensamentoForm.value).subscribe(() => {
        this.router.navigate(['/listar-pensamentos']);
      });
    }
  }

  cancelarEdicao(): void  {
    this.router.navigate(['/listar-pensamentos']);
  }

  habilitarBotao(): string {
    if (this.pensamentoForm.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
