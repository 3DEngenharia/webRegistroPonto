import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico-funcionario',
  imports: [CommonModule],
  templateUrl: './historico-funcionario.component.html',
  styleUrl: './historico-funcionario.component.css',
})
export class HistoricoFuncionarioComponent {
  constructor(private httpClient: HttpClient, private router: Router) {}

  public historico: any[] = [];

  ngOnInit() {
    // Verifica se a chave 'funcionarioId' existe no localStorage
    const funcionarioId = localStorage.getItem('funcionarioId');

    // Se existir, navega para a página de marcar ponto
    if (!funcionarioId) {
      this.router.navigate(['/pages/funcionarios/autenticar']);
    }

    this.httpClient
      .get(
        `http://localhost:8080/api/historico/obterPorIdDeFuncionario/${funcionarioId}`
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);

          this.historico = data;
        },
      });
  }
}
