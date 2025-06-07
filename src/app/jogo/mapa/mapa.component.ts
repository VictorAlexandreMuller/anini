import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {
  faseAtual = 0;

  @ViewChildren(
    'fase0, fase1, fase2, fase3, fase4, fase5, fase6, fase7, fase8, fase9, fase10, fase11, fase12, fase13, fase14, fase15, fase16, fase17, fase18, fase19, fase20, fase21, fase22, fase23, fase24, fase25, fase26, fase27, fase28, fase29, fase30'
  )
  fasesRef!: QueryList<ElementRef>;

  top = '0px';
  left = '0px';

  ngAfterViewInit() {
    this.fasesRef.changes.subscribe(() => this.atualizarPosicao());
    setTimeout(() => this.atualizarPosicao(), 0);
  }

  mostrarFase(i: number): boolean {
    if (i <= 10) return true;
    if (i <= 20 && this.faseAtual >= 10) return true;
    if (i <= 30 && this.faseAtual >= 20) return true;
    return false;
  }

  avançarFase() {
    if (this.faseAtual < 30) {
      this.faseAtual++;
      this.atualizarPosicao();
    }
  }

  voltarFase() {
    if (this.faseAtual > 0) {
      this.faseAtual--;
      this.atualizarPosicao();
    }
  }

  atualizarPosicao() {
    const fase = this.fasesRef.get(this.faseAtual);
    const borda = 2; // NUMERO DE PIXELS DA BORDA DA JOGADORA

    if (!fase) return;

    const el = fase.nativeElement as HTMLElement;
    const mapa = el.closest('.mapa') as HTMLElement | null;

    if (!mapa) return;

    this.top = `${el.offsetTop - 24 - borda}px`;
    this.left = `${el.offsetLeft + el.offsetWidth / 2 - 21 - borda}px`;
  }

  get playerStyle() {
    return {
      top: this.top,
      left: this.left,
    };
  }
}
