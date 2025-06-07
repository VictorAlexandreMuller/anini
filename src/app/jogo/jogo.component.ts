import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { InstrucoesComponent } from '../instrucoes/instrucoes.component';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [CommonModule, MapaComponent, InstrucoesComponent],
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss'],
})
export class JogoComponent implements AfterViewInit {
  @ViewChild('mapaRef') mapaComponent!: MapaComponent;
  mostrarInstrucoes = true;
  mostrarFade = true;
  carregado = false;
  mostrarModal = false;
  codigoDigitado: string = '';
  codigoValido: boolean = false;

  dicas: string[] = [
    'Esse é o início do jogo', // Fase 0
    'Você está conseguindo, muito bem!', // Fase 1
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.mostrarFade = false;
      this.carregado = true;
    }, 0);
  }

  fecharInstrucoes() {
    this.mostrarInstrucoes = false;
  }

  avancarFase() {
    this.mapaComponent.avançarFase();
    this.codigoDigitado = '';
    this.codigoValido = false;
  }

  voltarFase() {
    this.mapaComponent.voltarFase();
  }

  irParaInicio() {
    // aqui você volta para a tela inicial
    window.location.href = '/'; // ou algum método de rotas se estiver usando Router
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

    // Não precisa validar código na última fase
    if (faseAtual >= this.codigosFases.length) {
      this.codigoValido = false;
      return;
    }

    const codigoEsperado = this.codigosFases[faseAtual];
    this.codigoValido = this.codigoDigitado === codigoEsperado;
  }
}
