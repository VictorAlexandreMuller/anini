import { Component, ViewChild } from '@angular/core';
import { MapaComponent } from './mapa/mapa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('mapaRef') mapaComponent!: MapaComponent;

  avancarFase() {
    this.mapaComponent.avançarFase();
  }
}
