import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { InstrucoesComponent } from '../instrucoes/instrucoes.component';
import { BemVindoComponent } from '../bem-vindo/bem-vindo.component';

interface ParabensItem {
  texto: string;
  imagem: string; // nome do arquivo em src/assets/parabens/
}

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
  codigoDigitado: string = '';
  codigoValido: boolean = false;
  modalAberto: boolean = false;
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
    'Então aqui vai o primeiro enigma: "Daqui a pouco está quase na hora de dormir, será que precisaremos nos vestir adequadamente para sonharmos?"', // Fase 3
    'Até agora o nosso Radar não falhou! O próximo tesouro também parece estar próximo, então lá vai o próximo enigma: "Sou a primeira e guardo muitas coisas. Geralmente, quando a dona mesa quer se ver livre da bagunça, sou  eu quem atendo ao seu chamado engolindo tudo para dentro."', // Fase 4
    'Aparentemente o próximo tesouro está longe, mas aqui vai o próximo enigma: "Sou dual color. Preto e Branco me definem. Se eu não fosse um jogo, talvez pudesse ser facilmente confundido com uma Zebra?"', // Fase 5
    'O Radar quebrou?! Ele está dizendo que a temperatura do próximo tesouro está congelante, é quase como se o tesouro estivesse em cima de um iceberg. Dessa vez não é uma charada, eu não sei onde está esse tesouro. Você tem ideia de onde possa ter um lugar tão frio por aqui?', // Fase 6
    'Srta. Laura, acho que o nosso Radar duvidoso começou a falhar. Vi que ele localizou um outro tesouro perto de onde estávamos na fase anterior... Parece que esse tesouro esta perto de um "instrumento musical para animais" (?)', // Fase 7
    '<i>Bip, Bop. Bip, Bop</i><br>O Radar está com um barulho estranho... Ele está informando que o próximo tesouro está em um lugar perpendicular da onde estava a sua cesta do início... Parece um lugar comprido...', // Fase 8
    'Sabe do que estou com saudade? De enigma! Então lá vai: "Em meio ao vapor e ao som de água a cair, há um esconderijo que poucos vão descobrir. Não estou na banheira, nem sob o chão, mas próximo à pia, para guardar, sou o seu amigão."', // Fase 9
    'Eu fiquei sabendo que por aqui tem uma piscina e um parquinho de diversão... Faz tempo que não brinco em um parquinho... O que acha de descansarmos um pouco antes da próxima busca?', // Fase 10
    'Achei outro tesouro, parece estar perto. O mistério da vez é: "Eu corto o quintal em três partes, mas sou melhor estruturado do que o meu companheiro de serviço. Quem sou eu?"', // Fase 11
    'O próximo tesouro está longe, mas o próximo enigma está bem perto: "Em um espaço grande e profundo, moram dois gigantes que podem cruzar o mundo, cada um com as suas quatro pernas. Há descartes neste lugar... É lá onde há um tesouro para se encontrar."', // Fase 12
    'Srta. Laura, seguinte... O eixo "Y" no gráfico do Radar está indicando uma altitude maior do que a atual para o próximo tesouro... Você tem alguma ideia de onde possa ser?', // Fase 13
    '<i>O Victinho encontra algo... Devemos vasculhar.</i>', // Fase 14
    '<i>(O Radar grita)</i><br>"Fora do grande castelo dos tesouros, o guardião das águas habita escondido e calado. Um lugar pequeno e sem brilhar. Mas, sem ele, a piscina não se vê respirar."<br>Victinho diz: O que? Agora esse treco fala? Será que ele deve ter algum tipo de Inteligência Artificial que escuta o que eu falo?', // Fase 15
    'De acordo com o nosso Radar, o próximo tesouro está dentro do castelo. "Num salão amplo onde a calma costuma morar, há um gigante sereno que vive a esperar. Seu corpo é macio com um azul encantador, acolhendo os cansados com todo seu calor."', // Fase 16
    '"Sou pequena, discreta, mas cheia de funções, guardo segredos da casa, sem chamar a atenção. Entre pratos e copos, produtos de limpeza terão. Abrigo o que falta, sem muita organização. Não sou cozinha, mas dela faço parte, comigo se encontra o que não cabe em nenhum lugar de destaque."', // Fase 17
    'Esse radar está todo doido, ele sempre está nos mandando para lugares distantes de onde estamos... "Eles guardam a entrada como fiéis sentinelas, com galhos erguidos e folhas sempre belas. Vestem-se de verde com toques de sol, e oferecem o tesouro em forma de anzol. Árvores modestas, mas cheias de intenção, pois escondem segredos em cada limão."', // Fase 18
    'Srta. Laura, cuidado, este tesouro parece ser perigoso e difício. Banheiro das feras! "Enfrente as feras do nível inferior e reivindique o seu tesouro escondido no banheiro! (Se necessário, solicite ajuda, você é aventureira e não uma domadora)"', // Fase 19
    'Srta. Laura, estamos quase terminando as nossas buscas, mas preciso arrumar o Radar para continuarmos... Preciso de uma chave de fenda... Acho que tem uma caixa de ferramentas no quarto do Sr. Victor... Poderia pegar pra mim, por favor?', // Fase 20
    '<i>Victinho está paralizado. Você toma o radar da mão dele e percebe que os DOIS próximos tesouros estão na cozinha. Utensílios? Copos? Xícaras? Onde?</i>', // Fase 21
    '<i>Você continua pensando... Hum... Armários... Copos... Canecas... Xícaras... Onde pode estar?</i>', // Fase 22
    'Srta. Laura, o Radar está concertado, mas ele escuta tudo o que a gente fala... Vamos tentar pedir dica para a Alexa?<br><i>(Diga "Alexa, tesouro vinte e três.")</i>', // Fase 23
    '<i>Diga "Alexa, tesouro vinte e quatro."<i>', // Fase 24
    '<i>Diga "Alexa, tesouro vinte e cinco."<i>', // Fase 25
    'Vamos continuar as nossas buscas com o nosso Radar duvidoso da Shopee... "Com pés que giram, mas nunca andam sozinhos, guarda brasas do passado e aromas antigos. Mesmo em silêncio, ainda exala calor... O tesouro repousa onde já houve sabor."', // Fase 26
    'Parece que o radar quebrou... Ele diz que o próximo tesouro está próxima a uma churrasqueira, mas já não estamos aqui? Nós já pegamos esse tesouro...', // Fase 27
    'Srta. Laura, tenho uma péssima noticia. Infelizmente após a próxima dica eu irei embora, pois me chamaram para desvendar um mistério na cidade... Então não vamos perder tempo!  "Eles vivem ligados, dia e noite sem parar, dois guardiões digitais sempre prontos para trabalhar. Abaixo da maior base, onde ninguém costuma olhar, um tesouro repousa, pronto para despertar."', // Fase 28
    'Srta. Laura, vou lhe dar a próxima dica e me ausentar. Sentirei saudades de aprender tanto com a Srta., obrigado por tudo! O próximo e último enigma é: "Quando os dedos do músico começa a dançar, segredos antigos começarão a soar. Debaixo da melodia, onde poucos vão olhar, um tesouro aguarda, pronto para encantar." - Adeus e mais uma vez obrigado!', // Fase 29
    '<i>(Traduza o código binário)</i>', // Fase 30
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

  parabensItens: ParabensItem[] = [
    { texto: '', imagem: '' }, // ignora
    { texto: '', imagem: '' }, // ignora
    { texto: 'Muito bom!! Vamos tentar mais um para ver se você pegou o jeito de como faremos as nossas explorações.', imagem: 'vitinhoSagaz.png' }, // Fase 1 → Fase 2
    { texto: '😄<br>Como os boatos diziam!! Você realmente é muito boa e temos muita sorte por te-la do nosso lado. Vamos fazer o seguinte, já que esses dois primeiros tesouros foram muitos fáceis, a partir de agora nós vamos procurar os próximos de uma forma mais divertida... Eu verei mais ou menos a localização dos tesouros no meu radar e, de agora em diante, você procurará com base nos meus enigmas. E... Eu já ia me esquecendo... Pegue a cesta em cima do armário ao lado dos Guarda-Chuvas para que você possa acumular todos os desouros encontrados.', imagem: 'vitinhoExplicando.png' }, // Fase 2 → Fase 3
    { texto: '💤<br>Você é ótima Srta. Laura! Vamos logo para o próximo tesouro antes que a gente durma perto desses pijamas.', imagem: 'vitinhoTimido.png' }, // Fase 3 → Fase 4
    { texto: '📡<br>Eu estou impressionado, este Radar duvidoso é realmente muito bom! Ele só não é melhor do que você, Srta. Laura.', imagem: 'vitinhoSagaz.png' }, // Fase 4 → Fase 5
    { texto: '❔❔<br>Uma surpresa?! Fiquei sabendo que o Sr. Victor consegue trocar esses vales por outras coisas... O que será que ele te dará em troca desse vale misterioso?', imagem: 'vitinhoSagaz.png' }, // Fase 5 → Fase 6
    { texto: '🥶<br>Aiiii, que fr-friiiiiiioooo... Ouvi dizer que uma princesa das terras vizinhas sempre lava o seu lindo rosto com este sabonete. E sempre, quando vai enxaguar, faz um barulho engraçado. Dizem que o barulho é mais ou menos assim "Ahh Bruuuxxxxx".', imagem: 'vitinhoTimido.png' }, // Fase 6 → Fase 7
    { texto: '🐄<br>O Berrante poderia ser um instrumento que encontra tesouros ao em vez de chamar rebanhos, né?! Aparentemente haverão novos tesouros em lugares que já passamos anteriormente... Às vezes só não vimos...', imagem: 'vitinhoSagaz.png' }, // Fase 7 → Fase 8
    { texto: '🏠<br>Esse lugar é muito grande... Será que conseguiremos encontrar todos os tesouros? O Sr. Victor me comunicou que não haveriam tesouros escondidos dentro dos demais quartos, então acho que não precisamos nos preocupar em procurar dentro deles...', imagem: 'vitinhoTimido.png' }, // Fase 8 → Fase 9
    { texto: '❕❕<br>SRTA LAURA, QUE SORTE A NOSSA, APARECERAM MAIS 10 NOVOS TESOUROS NO NOSSO RADAR. Isso está melhor do que as Aventuras de Tintim.', imagem: 'vitinhoExplicando.png' }, // Fase 9 → Fase 10
    { texto: '🧐<br>SRTA. LAURA!!<br>Mesmo em momentos de descanso você não para. Por isso você é a melhor no que faz! Esqueça o que eu falei sobre descansar, a sua vontade imparável por procurar tesouros até mesmo em momentos de descanso me mostrou que eu tenho muito o que aprender. Vamos continuar na nossa busca!', imagem: 'vitinhoSagaz.png' }, // Fase 10 → Fase 11
    { texto: '🧱<br>Nenhum muro é páreo para nós, nada vai nos parar! Avante com muita dedicação e determinação!', imagem: 'vitinhoSagaz.png' }, // Fase 11 → Fase 12
    { texto: '🚗<br>Ouvi dizer que você é uma excelente motorista, Srta. Laura. O Sr. Victor me disse que já viu você estacionando dando drift.', imagem: 'vitinhoSagaz.png' }, // Fase 12 → Fase 13
    { texto: '🗻<br>Uau! Que vista... Dá pra ver toda a sala daqui de cima... Vários sofás, cadeiras e... O que é aquilo? Um Xadrez nordestino? SRTA. LAURA, ACHO QUE ESTOU VENDO ALGUMA COISA!', imagem: 'vitinhoExplicando.png' }, // Fase 13 → Fase 14
    { texto: '♟♟<br>Eu sabia, EU SABIA! Andar ao seu lado está melhorando à beça a minha capacidade de busca. Andar ao seu lado é aprender constantemente.<br>Eu sabia, EU SABIA! Andar ao seu lado está melhorando à beça a minha capacidade de busca. Andar ao seu lado é aprender constantemente.', imagem: 'vitinhoSagaz.png' }, // Fase 14 → Fase 15
    { texto: '🏊<br>Srta. Laura, que lugar escuro e tenebroso. Eu sei que... Somos aventureiros... E... Enfrentamos qualquer coisa... Mas... Podemos ir embora daqui?', imagem: 'vitinhoTimido.png' }, // Fase 15 → Fase 16
    { texto: '🍬<br>Bom Bom Bom Bom parece tão Bom Bom.', imagem: 'vitinhoSagaz.png' }, // Fase 16 → Fase 17
    { texto: '🍴<br>Esse lugar está me deixando com fome. Não comemos nada desde que começamos... Saco vazio não para em pé.', imagem: 'vitinhoTimido.png' }, // Fase 17 → Fase 18
    { texto: '🍋<br>Acabamos de falar sobre comida e o Radar nos trouxe para limoeiros. Estou começando a achar que ele escuta tudo o que a gente fala... QUERO MAIS TESOUROS, MAIS, MAIS!!', imagem: 'vitinhoSagaz.png' }, // Fase 18 → Fase 19
    { texto: '🐶<br><i>(Uma das feras derruba o Radar, ele cai no chão e quebra)</i><br>O MEU RADAR!! Ainda bem que estamos quase terminando as nossas buscas... Agora precisarei consertá-lo...', imagem: 'vitinhoTimido.png' }, // Fase 19 → Fase 20
    { texto: '🔧<br>O que?? Um tesouro escondido?! Só um segundo, deixe eu arrumar o Radar...<br><i>(Arrumando o Radar)</i><br>Pronto... Mas... PERA... SENHORITA LAURA!!', imagem: 'vitinhoExplicando.png' }, // Fase 20 → Fase 21
    { texto: '💭<br><i>Você pensa... Onde será que está o outro tesouro?</i>', imagem: '' }, // Fase 21 → Fase 22
    { texto: '😵<br><i>(Victinho volta ao normal)</i><br>Srta. Laura... Eu fiquei muito tempo apagado? O QUE?! DOIS TESOUROS?!', imagem: 'vitinhoTimido.png' }, // Fase 22 → Fase 23
    { texto: '📟<br>A TECNOLOGIA REALMENTE ESTÁ CRIANDO VIDA PRÓPRIA. É A REVOLUÇÃO DAS MÁQUINAS. Vamos tentar isso de novo?', imagem: 'vitinhoExplicando.png' }, // Fase 23 → Fase 24
    { texto: '📟<br>Isso é incrível, será que podemos continuar procurando os tesouros desse jeito?!', imagem: 'vitinhoExplicando.png' }, // Fase 24 → Fase 25
    { texto: '😅<br>A Alexa é realmente de mais. Será que ela ficou brava?', imagem: 'vitinhoTimido.png' }, // Fase 25 → Fase 26
    { texto: '🔥<br>Prefiro muito mais o calor de uma churrasqueira do que o frio da geladeira. Gosto de ficar quentinho. Será que sirvo mesmo para ser um explorador?', imagem: 'vitinhoTimido.png' }, // Fase 26 → Fase 27
    { texto: '🔥 x 2<br>Srta. Laura, você me surpreende a cada procura. Quem iria imaginar que existiria outra churrasqueira além daquela? Tenho muita sorte em ter você pra me ajudar a pensar durante as nossas buscas.', imagem: 'vitinhoSagaz.png' }, // Fase 27 → Fase 28
    { texto: '💻<br>Dizem que foi nesse guardião maior que essa caça ao tesouro foi forjada. Quando eu crescer quero ser igual ao Sr. Victor.', imagem: 'vitinhoSagaz.png' }, // Fase 28 → Fase 29
    { texto: '🔑<br><i>Você percebe que tem um papel e uma caneta junto com o tesouro e pensa... O que são todos esses números? Será uma dica?</i>', imagem: '' }, // Fase 29 → Fase 30
    { texto: '📃<br><i>(Uma Carta do Sr. Victor)</i><br>Laura, espero que tenha se divertido durante essa caça ao tesouro. Eu gostaria que soubesse que eu sempre me encho de felicidade e me sinto muito disposto a fazer as coisas quando o assunto é preparar algo especial para uma pessoa que eu amo. Eu não sei como esse jogo vai terminar, mas eu espero que me desculpe por fazer um presente tão longo. Mas garanto que o meu amor por você é ainda maior do que isso ou do que qualquer outra coisa que eu possa criar. Também espero que eu tenha acertado a maioria dos presente. Eu te amo muito, meu amor. Então, aproveito a oportunidade o clima deste último presente para te dizer: "Its always been you, Lau." - T4E21. 💖', imagem: 'miniVitinho.png' }, // Fase 30 → Fim
  ];

  currentParabensImg = '';

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
  const prox = (this.mapaComponent.faseAtual || 0) + 1;
  const item = this.parabensItens[prox] || { texto: '', imagem: '' };
  this._dividirTextoEmPartes(item.texto);
  this.currentParabensImg = item.imagem;
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
    const prox = (this.mapaComponent.faseAtual || 0) + 1;
    const item = this.parabensItens[prox] || { texto: '', imagem: '' };
    this.currentParabensImg = item.imagem;
    this._dividirTextoEmPartes(item.texto);
    this.modalAberto = true;
  }

  private _dividirTextoEmPartes(textoCompleto: string) {
    const palavras = textoCompleto.replace(/\s+/g, ' ').trim().split(' ');
    const partes: string[] = [];
    let parte = '';
    for (const p of palavras) {
      const tentativa = parte ? `${parte} ${p}` : p;
      if (tentativa.length <= this.maxCaracteresPorParteParabens) {
        parte = tentativa;
      } else {
        partes.push(parte);
        parte = p;
      }
    }
    if (parte) partes.push(parte);
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
