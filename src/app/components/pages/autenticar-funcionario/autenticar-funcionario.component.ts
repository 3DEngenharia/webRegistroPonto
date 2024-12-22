import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-autenticar-funcionario',
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './autenticar-funcionario.component.html',
  styleUrl: './autenticar-funcionario.component.css',
})
export class AutenticarFuncionarioComponent {
  constructor(private httpClient: HttpClient, private router: Router) {}

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      ),
    ]),
  });

  get f() {
    return this.formulario.controls;
  }

  ngOnInit(): void {
    // Verifica se a chave 'funcionarioId' existe no localStorage
    const funcionarioId = localStorage.getItem('funcionarioId');

    // Se existir, navega para a página de marcar ponto
    if (funcionarioId) {
      this.router.navigate(['/pages/marcar-ponto', funcionarioId]);
    }
  }

  autenticarFuncionario() {
    const formData = this.formulario.value;

    if (this.formulario.valid) {
      this.httpClient
        .post('http://localhost:8080/api/funcionarios/autenticar', formData)
        .subscribe({
          next: (response: any) => {
            const funcionarioId = response.id;

            if (funcionarioId) {
              localStorage.setItem('funcionarioId', funcionarioId);
            }

            this.router.navigate(['/pages/marcar-ponto', funcionarioId]);
          },
          error: (error) => {
            console.error('Erro ao autenticar:', error);
            alert(
              'Erro ao autenticar. Verifique suas credenciais e tente novamente.'
            );
          },
        });
    } else {
      alert('Por favor, preencha o formulário corretamente.');
    }
  }
}
