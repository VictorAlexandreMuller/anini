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
    'Bem-Vinda ao Castelo dos Tesouros! Eu sou o Vitinho.',
    'Estávamos ansiosos pela sua chegada.',
    'Ficamos sabendo que você é uma aventureira muito renomada e conhecida, Srta. Laura.',
    'Fique sabendo que essas são terras totalmente inexplorádas, então elas estão repletas de aventuras e tesouros escondidos.',
    'Eu estou com um Radar que comprei nos achadinhos da Shopee com a esperança de nos ajudar com o reconhecimento desse novo local.',
    'Só não sei se ele está funcionando, ainda não testei.',
    'Então me ajude a ficar atento nas pistas desse aparelho duvidoso e espero que se divirta nessa caça ao tesouro junto comigo.',
    'Como você acabou de chegar, vamos começar por um tesouro próximo que localizei...',
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
