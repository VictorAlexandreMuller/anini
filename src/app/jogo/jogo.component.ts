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
  mostrarConfirmacaoInicio = false;
  contadorConfirmacao = 5;
  botaoConfirmarHabilitado = false;
  intervaloConfirmacao: any;
  maxCaracteresPorParteDicas: number = 220;
  maxCaracteresPorParteParabens: number = 200;
  imagemLauraJaMostrada = false;
  mostrarImagemLaura = true;

  get faseAtual(): number {
    return this.mapaComponent?.faseAtual ?? 0;
  }

  dicas: string[] = [
    '', // Fase 0
    'De acordo com o nosso Radar existe um tesouro escondido aqui por perto, vamos vasculhar algumas gavetas para ver se encontramos...', // Fase 1
    'De acordo com o Radar, identifiquei que o próximo tesouro também está por perto. Parece até que neste mesmo ambiente, mas parece que existem muitos itens compridos junto com ele, onde será que ele pode estar?', // Fase 2
    'Então aqui vai o primeiro enigma: <i>Daqui a pouco está quase na hora de dormir, será que precisaremos nos vestir adequadamente para sonharmos?</i>', // Fase 3
    'Até agora o nosso Radar não falhou! O próximo tesouro também parece estar próximo, então lá vai o próximo enigma: <i>Sou a primeira e guardo muitas coisas. Geralmente, quando a dona mesa quer se ver livre da bagunça, sou </i> <i> eu quem atendo ao seu chamado engolindo tudo para dentro.</i>', // Fase 4
    'Aparentemente o próximo tesouro está longe, mas aqui vai o próximo enigma: <i>Sou dual color. Preto e Branco me definem. Se eu não fosse um jogo, talvez pudesse ser facilmente confundido com uma Zebra?</i>', // Fase 5
    'O Radar quebrou?! Ele está dizendo que a temperatura do próximo tesouro está congelante, é quase como se o tesouro estivesse em cima de um iceberg. Dessa vez não é uma charada, eu não sei onde está esse tesouro. Você tem ideia de onde possa ter um lugar tão frio por aqui?', // Fase 6
    'Srta. Laura, acho que o nosso Radar duvidoso começou a falhar. Vi que ele localizou um outro tesouro perto de onde estávamos na fase anterior... Parece que esse tesouro esta perto de um <i>instrumento musical para animais</i>(?)', // Fase 7

    'Dessa vez, deveste procurar o tesouro quase no mesmo lugar do tesouro da fase 3, a dica dizia algo sobre "vestir" e "hora de dormir"...', // Fase 8

    'Vamos para o penúltimo tesouro. Aparentemente ele também está perto, só que o radar avisa sobre uma alta taxa umidade neste novo ambiente...', // Fase 9
    'Você está fazendo isso com perfeição!', // Fase 10
    'Metade do caminho quase lá!', // Fase 11
    'Continue focada!', // Fase 12
    'Você é inteligente!', // Fase 13
    'Uau! Olha você passando tudo!', // Fase 14
    'Te amo, continue procurando', // Fase 15
    'Falta pouco para o fim!', // Fase 16
    'Isso está ficando emocionante!', // Fase 17
    'Você merece cada surpresa!', // Fase 18
    'Confio em você!', // Fase 19
    'Lá vem mais uma dica especial...', // Fase 20
    'Você já está na reta final!', // Fase 21
    'Fase 22: continue firme!', // Fase 22
    'Fase 23: será que está no armário?', // Fase 23
    'Fase 24: está ficando quente!', // Fase 24
    'Fase 25: respire fundo e vá!', // Fase 25
    'Fase 26: quaaaase lá!', // Fase 26
    'Fase 27: você está brilhando!', // Fase 27
    'Fase 28: não se canse agora!', // Fase 28
    'Fase 29: prepare-se para a reta final!', // Fase 29
    'Fase 30: Parabéns! Você chegou ao final 🎉❤️', // Fase 30
  ];

  codigosFases: string[] = [
    '', // Código da Fase 0 → desbloqueia a Fase 1
    '1', // Código da Fase 1 → desbloqueia a Fase 2
    '2', // Código da Fase 2 → desbloqueia a Fase 3
    '3', // Código da Fase 3 → desbloqueia a Fase 4
    '4', // Código da Fase 4 → desbloqueia a Fase 5
    '5', // Código da Fase 5 → desbloqueia a Fase 6
    '6', // Código da Fase 6 → desbloqueia a Fase 7
    '7', // Código da Fase 7 → desbloqueia a Fase 8
    '8', // Código da Fase 8 → desbloqueia a Fase 9
    '9', // Código da Fase 9 → desbloqueia a Fase 10
    '10', // Código da Fase 10 → desbloqueia a Fase 11
    '11', // Código da Fase 11 → desbloqueia a Fase 12
    '12', // Código da Fase 12 → desbloqueia a Fase 13
    '13', // Código da Fase 13 → desbloqueia a Fase 14
    '14', // Código da Fase 14 → desbloqueia a Fase 15
    '15', // Código da Fase 15 → desbloqueia a Fase 16
    '16', // Código da Fase 16 → desbloqueia a Fase 17
    '17', // Código da Fase 17 → desbloqueia a Fase 18
    '18', // Código da Fase 18 → desbloqueia a Fase 19
    '19', // Código da Fase 19 → desbloqueia a Fase 20
    '20', // Código da Fase 20 → desbloqueia a Fase 21
    '21', // Código da Fase 21 → desbloqueia a Fase 22
    '22', // Código da Fase 22 → desbloqueia a Fase 23
    '23', // Código da Fase 23 → desbloqueia a Fase 24
    '24', // Código da Fase 24 → desbloqueia a Fase 25
    '25', // Código da Fase 25 → desbloqueia a Fase 26
    '26', // Código da Fase 26 → desbloqueia a Fase 27
    '27', // Código da Fase 27 → desbloqueia a Fase 28
    '28', // Código da Fase 28 → desbloqueia a Fase 29
    '29', // Código da Fase 29 → desbloqueia a Fase 30
    '30', // Código da Fase 30 → desbloqueia a mensagem final de Parabéns
  ];

  frasesParabens: string[] = [
    '', // ignora
    '', // ignora
    'Muito bom!! Vamos tentar mais um para ver se você pegou o jeito de como faremos as nossas explorações.', // Frase da Fase 1 → Fase 2
    '😄<br>Como os boatos diziam!! Você realmente é muito boa e temos muita sorte por te-la do nosso lado. Vamos fazer o seguinte, já que esses dois primeiros tesouros foram muitos fáceis, a partir de agora nós vamos procurar os próximos de uma forma mais divertida... Eu verei mais ou menos a localização dos tesouros no meu radar e, de agora em diante, você procurará com base nos meus enigmas. E... Eu já ia me esquecendo... Pegue a cesta em cima do armário ao lado dos Guarda-Chuvas para que você possa acumular todos os desouros encontrados.', // Frase da Fase 2 → Fase 3
    '💤<br>Você é ótima Srta. Laura! Vamos logo para o próximo tesouro antes que a gente durma perto desses pijamas.', // Frase da Fase 3 → Fase 4
    '📡<br>Eu estou impressionado, este Radar duvidoso é realmente muito bom! Ele só não é melhor do que você, Srta. Laura.', // Frase da Fase 4 → Fase 5
    '❔<br>Uma surpresa?! Fiquei sabendo que o Sr. Victor consegue trocar esses vales por outras coisas... O que será que ele te dará em troca desse vale misterioso?', // Frase da Fase 5 → Fase 6
    '🥶<br>Aiiii, que fr-friiiiiiioooo... Ouvi dizer que uma princesa das terras vizinhas sempre lava o seu lindo rosto com este sabonete. E sempre, quando vai enxaguar, faz um barulho engraçado. Dizem que o barulho é mais ou menos assim "Ahh Bruuuxxxxx".', // Frase da Fase 6 → Fase 7
    '🐄<br>O Berrante poderia ser um instrumento que encontra tesouros ao em vez de chamar rebanhos, né?! Aparentemente haverão novos tesouros em lugares que já passamos anteriormente... Às vezes só não vimos...', // Frase da Fase 7 → Fase 8

    'Nesse inverno que entramos, isso caberá como uma luva! Só que nos pés...', // Frase da Fase 8 → Fase 9
    'SRTA LAURA, APARECERAM MAIS 10 NOVOS TESOUROS NO NOSSO RADAR. Essa procura está melhor do que o programa "Febre do Ouro" da Discovery Channel 😄', // Frase da Fase 9 → Fase 10
    'Você é uma campeã!', // Frase da Fase 10 → Fase 11
    'Continue assim, você está indo muito bem!', // Frase da Fase 11 → Fase 12
    'Você é brilhante! Continue!', // Frase da Fase 12 → Fase 13
    'Que fofa você procurando tudo direitinho!', // Frase da Fase 13 → Fase 14
    'Tá chegando no fim, hein!', // Frase da Fase 14 → Fase 15
    'Você merece todos esses momentos!', // Frase da Fase 15 → Fase 16
    'Cada presente é um pedacinho do meu amor!', // Frase da Fase 16 → Fase 17
    'Você é maravilhosa!', // Frase da Fase 17 → Fase 18
    'Quase lá! Faltam pouquinhos!', // Frase da Fase 18 → Fase 19
    'Está preparada para o final?', // Frase da Fase 19 → Fase 20
    'Te admiro demais!', // Frase da Fase 20 → Fase 21
    'Vai lá, detetive romântica!', // Frase da Fase 21 → Fase 22
    'Se eu fosse um presente, queria ser achado por você!', // Frase da Fase 22 → Fase 23
    'Você está se superando!', // Frase da Fase 23 → Fase 24
    'Quase no topo, meu amor!', // Frase da Fase 24 → Fase 25
    'Parabéns, você encontrou mais um!', // Frase da Fase 25 → Fase 26
    'Você chegou tão longe! ❤️', // Frase da Fase 26 → Fase 27
    'Seu esforço me encanta!', // Frase da Fase 27 → Fase 28
    'A próxima é a última, respira!', // Frase da Fase 28 → Fase 29
    'Te amo!!', // Frase da Fase 29 → Fase 30
    'Você venceu! Encontrou tudo com amor! 💖', // Frase da Fase 30 → FIM
  ];

  // APAGAR EM PRODUCAO ------------------------------------------------------------------------
  // ngOnInit(): void {
  //   window.addEventListener('keydown', this.fecharModalParabensComEnter.bind(this));
  // }

  // fecharModalParabensComEnter(event: KeyboardEvent): void {
  //   if (event.key === 'Enter' && this.modalAberto) {
  //     this.fecharModalParabens();
  //   }
  // }

  // ngOnDestroy(): void {
  //   window.removeEventListener('keydown', this.fecharModalParabensComEnter.bind(this));
  // }
  // APAGAR EM PRODUCAO ------------------------------------------------------------------------

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mostrarFade = false;
      this.carregado = true;
      this.atualizarPartesDica();
    }, 0);
  }

  atualizarPartesDica(): void {
    const dicaCompleta = this.dicas[this.mapaComponent?.faseAtual || 0] || '';

    const palavras = dicaCompleta.replace(/\s+/g, ' ').trim().split(' ');
    const partes: string[] = [];
    let parteAtual = '';

    for (const palavra of palavras) {
      const tentativa = parteAtual ? `${parteAtual} ${palavra}` : palavra;
      if (tentativa.length <= this.maxCaracteresPorParteDicas) {
        parteAtual = tentativa;
      } else {
        if (parteAtual) partes.push(parteAtual);
        parteAtual = palavra;
      }
    }

    if (parteAtual) partes.push(parteAtual);

    this.partesDicaAtual = partes;
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

    if (this.faseAtual < 30) {
      this.mapaComponent.avançarFase();
    }

    this.atualizarPartesDica();
    this.codigoDigitado = '';
    this.codigoValido = false;
    this.mostrarImagemLaura = true;
  }

  mostrarModalParabens() {
    this.mostrarImagemLaura = false;
    this.atualizarPartesFraseParabens();
    this.modalAberto = true;
  }

  atualizarPartesFraseParabens(): void {
    const faseAtual = this.mapaComponent?.faseAtual + 1 || 0;
    const fraseCompleta = this.frasesParabens[faseAtual] || '';

    const palavras = fraseCompleta.replace(/\s+/g, ' ').trim().split(' ');
    const partes: string[] = [];
    let parteAtual = '';

    for (const palavra of palavras) {
      const tentativa = parteAtual ? `${parteAtual} ${palavra}` : palavra;
      if (tentativa.length <= this.maxCaracteresPorParteParabens) {
        parteAtual = tentativa;
      } else {
        if (parteAtual) partes.push(parteAtual);
        parteAtual = palavra;
      }
    }

    if (parteAtual) partes.push(parteAtual);

    this.partesFraseParabensAtual = partes;
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

  abrirConfirmacaoInicio() {
    this.mostrarConfirmacaoInicio = true;
    this.contadorConfirmacao = 5;
    this.botaoConfirmarHabilitado = false;

    this.intervaloConfirmacao = setInterval(() => {
      this.contadorConfirmacao--;
      if (this.contadorConfirmacao <= 0) {
        clearInterval(this.intervaloConfirmacao);
        this.botaoConfirmarHabilitado = true;
      }
    }, 1000);
  }

  confirmarIrParaInicio() {
    window.location.href = '/';
  }

  cancelarConfirmacaoInicio() {
    this.mostrarConfirmacaoInicio = false;
    clearInterval(this.intervaloConfirmacao);
  }

  iniciarJogo(): void {
    this.imagemLauraJaMostrada = true;
    this.mapaComponent.avançarFase(); // Avança da fase 0 para a 1
    this.atualizarPartesDica(); // Atualiza a dica da nova fase
    this.codigoDigitado = ''; // Limpa qualquer código digitado
    this.codigoValido = false;
  }
}
