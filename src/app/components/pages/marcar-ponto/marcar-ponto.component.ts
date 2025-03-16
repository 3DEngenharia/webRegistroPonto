import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-marcar-ponto',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './marcar-ponto.component.html',
  styleUrl: './marcar-ponto.component.css',
})
export class MarcarPontoComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  public selectedAction: string = 'EXPEDIENTE_INICIO';
  public id: string = '';
  public registrationToday: string[] = [];

  ngOnInit(): void {
    // Verifica se a chave 'funcionarioId' existe no localStorage
    const funcionarioId = this.storageService.getItem('funcionarioId');

    // Se existir, navega para a página de marcar ponto
    if (!funcionarioId) {
      this.router.navigate(['/pages/funcionarios/autenticar']);
    }

    this.http
      .get(`http://localhost:8080/obterPorIdDeFuncionarioHoje/${funcionarioId}`)
      .subscribe({
        next: (data: any) => {
          console.log(data);

          this.registrationToday = data;
        },
      });

    this.id = funcionarioId as string;
  }

  baterPonto() {
    const operacao = this.selectedAction;

    const funcionario_id = this.storageService.getItem('funcionarioId');
    if (!funcionario_id) {
      alert('Funcionário não encontrado. Por favor, faça login novamente.');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const payload = {
            operacao,
            latitude,
            longitude,
            funcionario_id,
          };

          this.http
            .post('http://localhost:8080/api/historico', payload)
            .subscribe({
              next: (response) => {
                alert('Ponto registrado com sucesso!');
                console.log(response);
              },
              error: (error) => {
                alert('Erro ao registrar ponto.');
                console.error(error);
              },
            });
        },
        (error) => {
          alert(
            'Erro ao obter localização. Certifique-se de que a permissão de localização está habilitada.'
          );
          console.error(error);
        }
      );
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.');
    }
  }

  logout() {
    this.storageService.removeItem('funcionarioId');

    this.router.navigate(['/pages/funcionarios/autenticar']);
  }
}
