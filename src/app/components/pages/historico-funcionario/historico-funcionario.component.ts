import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { LeafletHelper } from '../../../helpers/leaflet.helper';
import { StorageService } from '../../../services/storage.service';

interface IHistoric {
  id: string;
  nome: string;
  data: Date;
  operacao:
    | 'EXPEDIENTE_INICIO'
    | 'ALMOÇO_INICIO'
    | 'ALMOÇO_FIM'
    | 'EXPEDIENTE_FIM';
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-historico-funcionario',
  imports: [CommonModule],
  templateUrl: './historico-funcionario.component.html',
  styleUrl: './historico-funcionario.component.css',
})
export class HistoricoFuncionarioComponent implements OnInit, AfterViewInit {
  public historico: any[] = [];
  private map: any; // Usando `any` para evitar problemas de tipagem antes do carregamento do Leaflet.

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageServie: StorageService,
    @Inject(PLATFORM_ID) private plataformId: Object
  ) {}

  private formatOperation(operationVariable: IHistoric['operacao']) {
    switch (operationVariable) {
      case 'EXPEDIENTE_INICIO':
        return 'Início de expediente';
      case 'ALMOÇO_INICIO':
        return 'Início do almoço';
      case 'ALMOÇO_FIM':
        return 'Retorno do almoço';
      default:
        return 'Fim de expediente';
    }
  }

  private async getAddressFromCoordinates(
    lat: string,
    lon: string
  ): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;

    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(url).subscribe({
        next: (response) => {
          console.log(response);

          resolve(`${response.address.road}, ${response.address.suburb}`);
        },
        error: (err) => {
          console.error(`Erro ao obter endereço para [${lat}, ${lon}]:`, err);
          resolve('Endereço não encontrado'); // Retorna um fallback em caso de erro
        },
      });
    });
  }

  ngOnInit() {
    const funcionarioId = this.storageServie.getItem('funcionarioId');

    if (!funcionarioId) {
      this.router.navigate(['/pages/funcionarios/autenticar']);
    } else {
      this.httpClient
        .get<IHistoric[]>(
          `http://localhost:8080/api/historico/obterPorIdDeFuncionario/${funcionarioId}`
        )
        .subscribe({
          next: async (data: IHistoric[]) => {
            this.historico = await Promise.all(
              data.map(async (e: IHistoric) => {
                const address = await this.getAddressFromCoordinates(
                  e.latitude.toString(),
                  e.longitude.toString()
                );
                return {
                  ...e,
                  operacao: this.formatOperation(e.operacao),
                  address,
                };
              })
            );
            // Atualize o mapa após carregar os dados
            if (isPlatformBrowser(this.plataformId)) {
              const L = await LeafletHelper.getLeaflet();
              this.initializeMap(L);
            }
          },
        });
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.plataformId)) {
      const L = await LeafletHelper.getLeaflet();
      const mapContainer = document.getElementById('map');

      if (mapContainer) {
        this.initializeMap(L);
      } else {
        console.error('O contêiner do mapa não foi encontrado no DOM.');
      }
    }
  }

  private initializeMap(L: any): void {
    if (!this.map) {
      setTimeout(() => {
        const mapContainer = document.getElementById('map');

        if (mapContainer) {
          this.map = L.map('map').setView([0, 0], 2);

          // Adiciona o tile layer (mapa base)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '©OpenStreetMap Vibetex',
          }).addTo(this.map);

          // Atualiza o mapa com os dados carregados
          this.updateMap(L);
        } else {
          console.error('O contêiner do mapa não foi encontrado no DOM.');
        }
      }, 500); // Ajuste o tempo conforme necessário
    }
  }

  private updateMap(L: any): void {
    if (this.map && this.historico.length > 0) {
      const bounds = L.latLngBounds(
        this.historico.map((item) => [
          Number(item.latitude),
          Number(item.longitude),
        ])
      );

      // Define o limite de visualização do mapa com base nos dados
      this.map.fitBounds(bounds);

      // Adiciona marcadores para cada ponto no histórico
      this.historico.forEach((item) => {
        if (item.latitude && item.longitude) {
          L.marker([Number(item.latitude), Number(item.longitude)])
            .addTo(this.map)
            .bindPopup(
              `<b>${item.nome}</b><br>${item.operacao}<br>${new Date(
                item.data
              ).toLocaleString()}<br>${item.address}`
            );
        }
      });
    }
  }
}
