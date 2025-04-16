import { EditarPensamentoComponent } from './components/pensamentos/editar-pensamento/editar-pensamento.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPensamentosComponent } from './components/pensamentos/criar-pensamentos/criar-pensamentos.component';
import { ListarPensamentosComponent } from './components/pensamentos/listar-pensamentos/listar-pensamentos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar-pensamentos',
    pathMatch: 'full'
  },
  {
    path: 'criar-pensamento',
    component: CriarPensamentosComponent
  },
  {
    path: 'listar-pensamentos',
    component: ListarPensamentosComponent
  },
  {
    path: 'editar-pensamento/:id',
    component: EditarPensamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
