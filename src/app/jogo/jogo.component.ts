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

    '', // Fase 8

    '', // Fase 9
    '', // Fase 10
    '', // Fase 11
    '', // Fase 12
    '', // Fase 13
    '', // Fase 14
    '', // Fase 15
    '', // Fase 16
    '', // Fase 17
    '', // Fase 18
    '', // Fase 19
    'Srta. Laura, agora que terminamos a busca, você poderia me emprestar uma chave de fenda? Eu gostaria de tentar arrumar este Radar... Acho que tem uma caixa de ferramentas no quarto do Sr. Victor... Poderia pegar pra mim, por favor?', // Fase 20
    '', // Fase 21
    '', // Fase 22
    '', // Fase 23
    '', // Fase 24
    '', // Fase 25
    '', // Fase 26
    '', // Fase 27
    '', // Fase 28
    '', // Fase 29
    '🎉❤️', // Fase 30
  ];

  codigosFases: string[] = [
    '', // Código da Fase 0 → desbloqueia a Fase 1
    'RESSACADAIDADE', // Código da Fase 1 → desbloqueia a Fase 2
    'MIMOSALGADO', // Código da Fase 2 → desbloqueia a Fase 3
    'TESOURODOCE', // Código da Fase 3 → desbloqueia a Fase 4
    'MORDIDAGOSTOSA', // Código da Fase 4 → desbloqueia a Fase 5
    'OQUESERA', // Código da Fase 5 → desbloqueia a Fase 6
    'AHHHBRUXX', // Código da Fase 6 → desbloqueia a Fase 7
    'TODADELICADA', // Código da Fase 7 → desbloqueia a Fase 8
    'CHEIRODEPAZ', // Código da Fase 8 → desbloqueia a Fase 9
    'CABELOIMPERMEAVEL', // Código da Fase 9 → desbloqueia a Fase 10
    'FILMEZINHOPIPOQUINHA', // Código da Fase 10 → desbloqueia a Fase 11
    'EITAQUEMASSA', // Código da Fase 11 → desbloqueia a Fase 12
    'ESTILOPRINCESA', // Código da Fase 12 → desbloqueia a Fase 13
    'PESDEBEBE', // Código da Fase 13 → desbloqueia a Fase 14
    'GARRASPERFEITAS', // Código da Fase 14 → desbloqueia a Fase 15
    'PRONTAPROCRIME', // Código da Fase 15 → desbloqueia a Fase 16
    'BOMBOMBOMBOM', // Código da Fase 16 → desbloqueia a Fase 17
    'LAURYA', // Código da Fase 17 → desbloqueia a Fase 18
    'SNAKEONEAR', // Código da Fase 18 → desbloqueia a Fase 19
    'BANHOMACIO', // Código da Fase 19 → desbloqueia a Fase 20
    'RELAXAMENTOTOTAL', // Código da Fase 20 → desbloqueia a Fase 21
    'DRACARYS', // Código da Fase 21 → desbloqueia a Fase 22
    'WINGARDIUMLEVILAURA', // Código da Fase 22 → desbloqueia a Fase 23
    'ALEXAAPAGARALUZ', // Código da Fase 23 → desbloqueia a Fase 24
    'PASCOAISBACK', // Código da Fase 24 → desbloqueia a Fase 25
    'COMIDAJAPABURGUER', // Código da Fase 25 → desbloqueia a Fase 26
    'CARINHOEHIDRATACAO', // Código da Fase 26 → desbloqueia a Fase 27
    'THECHOSENONE', // Código da Fase 27 → desbloqueia a Fase 28
    'DIADEPRINCESA', // Código da Fase 28 → desbloqueia a Fase 29
    'FRAGRANCIALAURINHA', // Código da Fase 29 → desbloqueia a Fase 30
    'YOUAREMYRACH', // Código da Fase 30 → desbloqueia a mensagem final de Parabéns
  ];

  frasesParabens: string[] = [
    '', // ignora
    '', // ignora
    'Muito bom!! Vamos tentar mais um para ver se você pegou o jeito de como faremos as nossas explorações.', // Frase da Fase 1 → Fase 2
    '😄<br>Como os boatos diziam!! Você realmente é muito boa e temos muita sorte por te-la do nosso lado. Vamos fazer o seguinte, já que esses dois primeiros tesouros foram muitos fáceis, a partir de agora nós vamos procurar os próximos de uma forma mais divertida... Eu verei mais ou menos a localização dos tesouros no meu radar e, de agora em diante, você procurará com base nos meus enigmas. E... Eu já ia me esquecendo... Pegue a cesta em cima do armário ao lado dos Guarda-Chuvas para que você possa acumular todos os desouros encontrados.', // Frase da Fase 2 → Fase 3
    '💤<br>Você é ótima Srta. Laura! Vamos logo para o próximo tesouro antes que a gente durma perto desses pijamas.', // Frase da Fase 3 → Fase 4
    '📡<br>Eu estou impressionado, este Radar duvidoso é realmente muito bom! Ele só não é melhor do que você, Srta. Laura.', // Frase da Fase 4 → Fase 5
    '❔❔<br>Uma surpresa?! Fiquei sabendo que o Sr. Victor consegue trocar esses vales por outras coisas... O que será que ele te dará em troca desse vale misterioso?', // Frase da Fase 5 → Fase 6
    '🥶<br>Aiiii, que fr-friiiiiiioooo... Ouvi dizer que uma princesa das terras vizinhas sempre lava o seu lindo rosto com este sabonete. E sempre, quando vai enxaguar, faz um barulho engraçado. Dizem que o barulho é mais ou menos assim "Ahh Bruuuxxxxx".', // Frase da Fase 6 → Fase 7
    '🐄<br>O Berrante poderia ser um instrumento que encontra tesouros ao em vez de chamar rebanhos, né?! Aparentemente haverão novos tesouros em lugares que já passamos anteriormente... Às vezes só não vimos...', // Frase da Fase 7 → Fase 8

    '', // Frase da Fase 8 → Fase 9
    '❕❕<br>SRTA LAURA, APARECERAM MAIS 10 NOVOS TESOUROS NO NOSSO RADAR. Essa procura está melhor do que o programa "Febre do Ouro" da Discovery Channel 😄', // Frase da Fase 9 → Fase 10
    '', // Frase da Fase 10 → Fase 11
    '', // Frase da Fase 11 → Fase 12
    '', // Frase da Fase 12 → Fase 13
    '', // Frase da Fase 13 → Fase 14
    '', // Frase da Fase 14 → Fase 15
    '', // Frase da Fase 15 → Fase 16
    '', // Frase da Fase 16 → Fase 17
    '', // Frase da Fase 17 → Fase 18
    '', // Frase da Fase 18 → Fase 19
    '', // Frase da Fase 19 → Fase 20
    '🔧<br>O que?? Um tesouro escondido?! Só um segundo, deixe eu arrumar o Radar...<br><i>(Arrumando o Radar)</i><br>Pronto... Mas... PERA... SENHORITA LAURA!!', // Frase da Fase 20 → Fase 21
    '', // Frase da Fase 21 → Fase 22
    '', // Frase da Fase 22 → Fase 23
    '', // Frase da Fase 23 → Fase 24
    '', // Frase da Fase 24 → Fase 25
    '', // Frase da Fase 25 → Fase 26
    '', // Frase da Fase 26 → Fase 27
    '', // Frase da Fase 27 → Fase 28
    '', // Frase da Fase 28 → Fase 29
    '', // Frase da Fase 29 → Fase 30
    '💖<br>', // Frase da Fase 30 → FIM
  ];

  // APAGAR EM PRODUCAO ------------------------------------------------------------------------
  ngOnInit(): void {
    window.addEventListener('keydown', this.fecharModalParabensComEnter.bind(this));
  }

  fecharModalParabensComEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.modalAberto) {
      this.fecharModalParabens();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.fecharModalParabensComEnter.bind(this));
  }
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
    const input = (event.target as HTMLInputElement).value.trim();
    this.codigoDigitado = input;
    this.codigoValido = false;

    if (!this.mapaComponent) return;

    const fase = this.mapaComponent.faseAtual;
    if (fase < this.codigosFases.length) {
      const esperado = this.codigosFases[fase];
      this.codigoValido = input === esperado;
      if (fase === 20 && this.codigoValido) {
        this.mapaComponent.mostrarFases21a30 = true;
      }
    }
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
