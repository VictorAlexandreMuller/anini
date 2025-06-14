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
  { texto: 'Olá!', imagem: 'vitinhoSagaz.png' },
  { texto: 'Eu sou o Vitinho.', imagem: 'vitinhoSagaz.png' },
  { texto: 'E Bem-Vinda ao Castelo dos Tesouros!', imagem: 'vitinhoSagaz.png' },
  { texto: 'Você deve ser a Srta. Laura, certo?', imagem: 'vitinhoSagaz.png' },
  { texto: 'O Sr. Victor, meu mestre, nos avisou da sua chegada.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Nós chegamos ontem à noite, mas ainda não tivemos muito tempo para exploração.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Apenas nos instalamos e fizemos um breve reconhecimento do local.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Isso significa que você chegou bem a tempo da ação.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Você sabia que este castelo está sendo preparado a meses para este momento?', imagem: 'vitinhoExplicando.png' },
  { texto: 'Nosso mestre nos contou que você é uma aventureira muito conhecida, renomada e perspicaz na área da exploração.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Eu sou novo no ramo, então não sei muitas coisas.', imagem: 'vitinhoTimido.png' },
  { texto: 'Espero não te atrapalhar durante as buscas.', imagem: 'vitinhoTimido.png' },
  { texto: 'Mas não se preocupe, eu tenho uma solução para compensar a minha falta de experiência!', imagem: 'vitinhoSagaz.png' },
  { texto: 'Eu comprei um maravilhoso Radar nos achadinhos da Shopee, veja que lindo!', imagem: 'vitinhoSagaz.png' },
  { texto: '<i>(O Radar)</i>', imagem: 'radar.png' },
  { texto: 'Eu... Só... Ainda não testei...', imagem: 'vitinhoTimido.png' },
  { texto: 'Então não sei se ele está realmente funcionando...', imagem: 'vitinhoTimido.png' },
  { texto: 'Mas... Vamos ser otimistas!!', imagem: 'vitinhoSagaz.png' },
  { texto: 'É claro que ele deve estar funcionando!!', imagem: 'vitinhoSagaz.png' },
  { texto: 'Como seremos uma dupla ao longo dessa exploração, espero aprender muito ao seu lado.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Vamos ficar atentos a todas as pistas.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Mas é isso.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Espero que se divirta nessa caça ao tesouro junto comigo.', imagem: 'vitinhoSagaz.png' },
  { texto: 'Fiquei sabendo que existem 10 tesouros espalhados e escondidos por aqui.', imagem: 'vitinhoExplicando.png' },
  { texto: 'Como você já chegou, não vamos mais perder tempo.', imagem: 'vitinhoExplicando.png' },
  { texto: 'Vamos dar inicio à nossa caça ao tesouro?', imagem: 'vitinhoSagaz.png' },
  { texto: 'Vou ligar o Radar!', imagem: 'vitinhoExplicando.png' },
  { texto: '<i>(Barulhos duvidosos)</i>', imagem: 'vitinhoTimido.png' },
  { texto: '<i>(O Radar liga)</i>', imagem: 'radar.png' },
  { texto: 'Encontrei um tesouro que está bem próximo.', imagem: 'vitinhoExplicando.png' },
  { texto: 'Vamos lá!', imagem: 'vitinhoSagaz.png' },
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
