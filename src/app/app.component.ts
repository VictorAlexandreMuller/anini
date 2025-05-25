import { Component, ViewChild } from '@angular/core';
import { MapaComponent } from './mapa/mapa.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MapaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
