import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-instrucoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instrucoes.component.html',
  styleUrls: ['./instrucoes.component.scss'],
})
export class InstrucoesComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  @Output() fechar = new EventEmitter<void>();

  slides = [
    '🔍 <br> Leia as pistas na parte superior da tela.',
    '💎 <br> Procure pelos tesouros escondidos.',
    '🔖 <br> Cada tesouro terá um código. Utilize destes códigos para avançar pelas trilhas e conquistar todos os tesouros escondidos.',
    '🎉 <br> Boa Sorte!',
  ];
  currentSlide = 0;

  voltarSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  avancarSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }
}
