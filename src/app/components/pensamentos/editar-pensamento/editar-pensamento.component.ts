import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  pensamentoForm!: FormGroup;

  constructor(private pensamentoService: PensamentoService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.pensamentoForm = this.formBuilder.group({
      conteudo: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(300)])],
      autoria: ['', Validators.required],
      modelo: ['', Validators.pattern('modelo1|modelo2|modelo3')]
    });

    if (id) {
      this.buscarPensamento(id);
    }
  }

  buscarPensamento(id: number) {
    this.pensamentoService.getById(id).subscribe((pensamento: Pensamento) => {
      this.pensamentoForm.patchValue({
        conteudo: pensamento.conteudo,
        autoria: pensamento.autoria,
        modelo: pensamento.modelo
      });
    })
  }

  editarPensamento(): void {
    if (this.pensamentoForm.invalid) {
      return;
    }

    this.pensamentoService.update(this.pensamento).subscribe(() => {
      this.router.navigate(['/listar-pensamentos']);
    });
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
