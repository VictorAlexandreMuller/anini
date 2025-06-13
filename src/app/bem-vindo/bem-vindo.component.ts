import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bem-vindo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bem-vindo.component.html',
  styleUrl: './bem-vindo.component.scss'
})
export class BemVindoComponent {
images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  @Output() fechar = new EventEmitter<void>();

  slides = [
    '🔍 teste',
    '💎 teste',
    '🔖 teste',
    '🎉 teste',
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
