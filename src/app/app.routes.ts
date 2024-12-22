import { Routes } from '@angular/router';
import { AutenticarFuncionarioComponent } from './components/pages/autenticar-funcionario/autenticar-funcionario.component';
import { CriarFuncionarioComponent } from './components/pages/criar-funcionario/criar-funcionario.component';
import { RelatorioGestorComponent } from './components/pages/relatorio-gestor/relatorio-gestor.component';
import { MarcarPontoComponent } from './components/pages/marcar-ponto/marcar-ponto.component';
import { AutenticarGestorComponent } from './components/pages/autenticar-gestor/autenticar-gestor.component';
import { HistoricoFuncionarioComponent } from './components/pages/historico-funcionario/historico-funcionario.component';

export const routes: Routes = [
  {
    path: 'pages/funcionarios/autenticar',
    component: AutenticarFuncionarioComponent,
  },
  {
    path: 'pages/funcionarios/cadastro',
    component: CriarFuncionarioComponent,
  },
  {
    path: 'pages/relatorio-gestor',
    component: RelatorioGestorComponent,
  },
  {
    path: 'pages/marcar-ponto/:id',
    component: MarcarPontoComponent,
  },
  {
    path: 'pages/autenticar-gestor',
    component: AutenticarGestorComponent,
  },
  {
    path: 'pages/funcionarios/historico/:id',
    component: HistoricoFuncionarioComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pages/funcionarios/autenticar',
  },
];
