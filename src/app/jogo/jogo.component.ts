import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { InstrucoesComponent } from '../instrucoes/instrucoes.component';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule, MapaComponent, InstrucoesComponent],
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss'],
})
export class JogoComponent implements AfterViewInit {
  @ViewChild('mapaRef') mapaComponent!: MapaComponent;
  mostrarInstrucoes = true;
  mostrarFade = true;
  carregado = false;
  mostrarModal = false;

  ngAfterViewInit() {
    setTimeout(() => (this.mostrarFade = false), 1000);
  }

  fecharInstrucoes() {
    this.mostrarInstrucoes = false;
  }

  avancarFase() {
    this.mapaComponent.avançarFase();
  }

  voltarFase() {
    this.mapaComponent.voltarFase();
  }

  irParaInicio() {
    // aqui você volta para a tela inicial
    window.location.href = '/'; // ou algum método de rotas se estiver usando Router
  }

  abrirModal() {
  this.mostrarInstrucoes = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }
}
