import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { InstrucoesComponent } from '../instrucoes/instrucoes.component';
import { BemVindoComponent } from '../bem-vindo/bem-vindo.component';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [
    CommonModule,
    MapaComponent,
    InstrucoesComponent,
    BemVindoComponent,
  ],
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss'],
})
export class JogoComponent implements AfterViewInit {
  @ViewChild('mapaRef') mapaComponent!: MapaComponent;
  mostrarBemVindo = true;
  mostrarInstrucoes = false;
  mostrarFade = true;
  carregado = false;
  mostrarModal = false;
  codigoDigitado: string = '';
  codigoValido: boolean = false;
  modalAberto: boolean = false;
  fraseParabensAtual: string = '';
  indiceParteAtual = 0;
  partesDicaAtual: string[] = [];
  partesFraseParabensAtual: string[] = [];
  indiceParteParabensAtual = 0;

  get faseAtual(): number {
    return this.mapaComponent?.faseAtual ?? 0;
  }

  dicas: string[] = [
    'Esse é o início do jogo', // Fase 0
    'Como os boatos diziam!! Você realmente é muito boa!! Temos sorte por te-la conosco. Vamos fazer o seguinte, já que esses dois primeiros tesouros foram fáceis de mais, a partir de agora nós vamos procurar os próximos de uma forma mais divertida... Eu verei mais ou menos a localização dos tesouros no meu radar e, de agora em diante, você procurará com base nos meus enigmas... 🙈 Sendo assim, pegue a cesta em cima do armário ao lado dos Guarda-Chuvas para que possamos continuar indo atrás dos demais tesouro sem preocupações.', // Fase 1
    'Continue assim!', // Fase 2
    'Já está indo longe, hein?', // Fase 3
    'Não desista agora!', // Fase 4
    'Você está arrasando!', // Fase 5
    'Cada vez mais perto!', // Fase 6
    'Você é demais!', // Fase 7
    'Mais uma etapa vencida!', // Fase 8
    'Você está fazendo isso com perfeição!', // Fase 9
    'Metade do caminho quase lá!', // Fase 10
    'Continue focada!', // Fase 11
    'Você é inteligente!', // Fase 12
    'Uau! Olha você passando tudo!', // Fase 13
    'Te amo, continue procurando', // Fase 14
    'Falta pouco para o fim!', // Fase 15
    'Isso está ficando emocionante!', // Fase 16
    'Você merece cada surpresa!', // Fase 17
    'Confio em você!', // Fase 18
    'Lá vem mais uma dica especial...', // Fase 19
    'Você já está na reta final!', // Fase 20
    'Fase 21: continue firme!', // Fase 21
    'Fase 22: será que está no armário?', // Fase 22
    'Fase 23: está ficando quente!', // Fase 23
    'Fase 24: respire fundo e vá!', // Fase 24
    'Fase 25: quaaaase lá!', // Fase 25
    'Fase 26: você está brilhando!', // Fase 26
    'Fase 27: não se canse agora!', // Fase 27
    'Fase 28: prepare-se para a reta final!', // Fase 28
    'Fase 29: penúltima fase, você consegue!', // Fase 29
    'Fase 30: Parabéns! Você chegou ao final 🎉❤️', // Fase 30
  ];

  codigosFases: string[] = [
    '1', // Fase 0 → código para desbloquear a fase 1
    '2', // Fase 1 → código para desbloquear a fase 2
    '3', // Fase 2
    '4', // Fase 3
    '5', // Fase 4
    '6', // Fase 5
    '7', // Fase 6
    '8', // Fase 7
    '9', // Fase 8
    '10', // Fase 9
    '11', // Fase 10
    '12', // Fase 11
    '13', // Fase 12
    '14', // Fase 13
    '15', // Fase 14
    '16', // Fase 15
    '17', // Fase 16
    '18', // Fase 17
    '19', // Fase 18
    '20', // Fase 19
    '21', // Fase 20
    '22', // Fase 21
    '23', // Fase 22
    '24', // Fase 23
    '25', // Fase 24
    '26', // Fase 25
    '27', // Fase 26
    '28', // Fase 27
    '29', // Fase 28
    '30', // Fase 29 → código para desbloquear a fase 30
    // Fase 30 não tem próxima, então não precisa código
  ];

  frasesParabens: string[] = [
    '', // Fase 0 não tem
    'Como os boatos diziam!! Você realmente é muito boa!! Temos sorte por te-la conosco. Vamos fazer o seguinte, já que esses dois primeiros tesouros foram fáceis de mais, a partir de agora nós vamos procurar os próximos de uma forma mais divertida... Eu verei mais ou menos a localização dos tesouros no meu radar e, de agora em diante, você procurará com base nos meus enigmas... 🙈 Sendo assim, pegue a cesta em cima do armário ao lado dos Guarda-Chuvas para que possamos continuar indo atrás dos demais tesouro sem preocupações.Como os boatos diziam!! Você realmente é muito boa!! Temos sorte por te-la conosco. Vamos fazer o seguinte, já que esses dois primeiros tesouros foram fáceis de mais, a partir de agora nós vamos procurar os próximos de uma forma mais divertida... Eu verei mais ou menos a localização dos tesouros no meu radar e, de agora em diante, você procurará com base nos meus enigmas... 🙈 Sendo assim, pegue a cesta em cima do armário ao lado dos Guarda-Chuvas para que possamos continuar indo atrás dos demais tesouro sem preocupações.', // Fase 1
    'Parabéns, você está conseguindo, continue!', // Fase 2
    'Mais um presente achado com sucesso!', // Fase 3
    'Você é incrível, olha só esse avanço!', // Fase 4
    'Eu sabia que você ia acertar!', // Fase 5
    'Seu progresso me enche de alegria!', // Fase 6
    'Você está arrasando demais!', // Fase 7
    'Isso aqui está ficando emocionante!', // Fase 8
    'Parabéns! Mais uma etapa vencida!', // Fase 9
    'Uau, você chegou até aqui, que orgulho!', // Fase 10
    'Você é uma campeã!', // Fase 11
    'Continue assim, você está indo muito bem!', // Fase 12
    'Você é brilhante! Continue!', // Fase 13
    'Que fofa você procurando tudo direitinho!', // Fase 14
    'Tá chegando no fim, hein!', // Fase 15
    'Você merece todos esses momentos!', // Fase 16
    'Cada presente é um pedacinho do meu amor!', // Fase 17
    'Você é maravilhosa!', // Fase 18
    'Quase lá! Faltam pouquinhos!', // Fase 19
    'Está preparada para o final?', // Fase 20
    'Te admiro demais!', // Fase 21
    'Vai lá, detetive romântica!', // Fase 22
    'Se eu fosse um presente, queria ser achado por você!', // Fase 23
    'Você está se superando!', // Fase 24
    'Quase no topo, meu amor!', // Fase 25
    'Parabéns, você encontrou mais um!', // Fase 26
    'Você chegou tão longe! ❤️', // Fase 27
    'Seu esforço me encanta!', // Fase 28
    'A próxima é a última, respira!', // Fase 29
    'Você venceu! Encontrou tudo com amor! 💖', // Fase 30
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mostrarFade = false;
      this.carregado = true;
      this.atualizarPartesDica();
    }, 0);
  }

  atualizarPartesDica(): void {
    const dicaCompleta = this.dicas[this.mapaComponent?.faseAtual || 0] || '';
    const tamanhoMaximo = 200;
    this.partesDicaAtual =
      dicaCompleta.match(new RegExp(`.{1,${tamanhoMaximo}}`, 'g')) || [];
    this.indiceParteAtual = 0;
  }

  avancarParteDica(): void {
    if (this.indiceParteAtual < this.partesDicaAtual.length - 1) {
      this.indiceParteAtual++;
    }
  }

  voltarParteDica(): void {
    if (this.indiceParteAtual > 0) {
      this.indiceParteAtual--;
    }
  }

  exibirInstrucoes() {
    this.mostrarBemVindo = false;
    this.mostrarInstrucoes = true;
  }

  fecharInstrucoes() {
    this.mostrarInstrucoes = false;
  }

  avancarFase() {
    if (!this.mapaComponent) return;

    const faseAtual = this.mapaComponent.faseAtual + 1;
    this.fraseParabensAtual = this.frasesParabens[faseAtual] || 'Parabéns!';
    this.modalAberto = true;
  }

  voltarFase() {
    if (this.mapaComponent) {
      this.mapaComponent.voltarFase();
      this.atualizarPartesDica();
    }
  }

  irParaInicio() {
    window.location.href = '/';
  }

  abrirModal() {
    this.mostrarInstrucoes = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  verificarCodigo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.codigoDigitado = input.value.trim();

    if (!this.mapaComponent) {
      this.codigoValido = false;
      return;
    }

    const faseAtual = this.mapaComponent.faseAtual;

    if (faseAtual >= this.codigosFases.length) {
      this.codigoValido = false;
      return;
    }

    const codigoEsperado = this.codigosFases[faseAtual];
    this.codigoValido = this.codigoDigitado === codigoEsperado;
  }

  fecharModalParabens() {
    this.modalAberto = false;
    this.mapaComponent.avançarFase();
    this.atualizarPartesDica();
    this.codigoDigitado = '';
    this.codigoValido = false;
  }

  mostrarModalParabens() {
    this.atualizarPartesFraseParabens();
    this.modalAberto = true;
  }

  atualizarPartesFraseParabens(): void {
    const faseAtual = this.mapaComponent?.faseAtual + 1 || 0;
    const fraseCompleta = this.frasesParabens[faseAtual] || 'Parabéns!';
    const tamanhoMaximo = 550;

    this.partesFraseParabensAtual =
      fraseCompleta.match(new RegExp(`.{1,${tamanhoMaximo}}`, 'g')) || [];
    this.indiceParteParabensAtual = 0;
  }

  avancarParteParabens(): void {
    if (
      this.indiceParteParabensAtual <
      this.partesFraseParabensAtual.length - 1
    ) {
      this.indiceParteParabensAtual++;
    }
  }

  voltarParteParabens(): void {
    if (this.indiceParteParabensAtual > 0) {
      this.indiceParteParabensAtual--;
    }
  }
}
