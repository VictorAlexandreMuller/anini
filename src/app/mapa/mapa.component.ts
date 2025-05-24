import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {
  faseAtual = 0;

  fases = [
    { x: 5, y: 20 }, { x: 20, y: 20 }, { x: 40, y: 20 }, { x: 60, y: 20 },
    { x: 60, y: 40 }, { x: 40, y: 40 }, { x: 20, y: 40 }, { x: 20, y: 60 },
    { x: 40, y: 60 }, { x: 80, y: 60 }
  ];

  get playerStyle() {
    const pos = this.fases[this.faseAtual];
    return {
      left: `calc(${pos.x}% - 16px)`,
      top: `calc(${pos.y}% - 32px)`
    };
  }

  avançarFase() {
    if (this.faseAtual < this.fases.length - 1) {
      this.faseAtual++;
    }
  }
}
