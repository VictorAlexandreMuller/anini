import { Component, ViewChild } from '@angular/core';
import { MapaComponent } from "./mapa/mapa.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule, MapaComponent],
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss'],
})
export class JogoComponent {
  @ViewChild('mapaRef') mapaComponent!: MapaComponent;

  carregado = false;

  ngAfterViewInit() {
    setTimeout(() => (this.carregado = true), 0);
  }

  avancarFase() {
    this.mapaComponent.avançarFase();
  }

  voltarFase() {
    this.mapaComponent.voltarFase();
  }
}