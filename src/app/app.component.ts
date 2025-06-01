import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApresentacaoComponent } from './apresentacao/apresentacao.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { JogoComponent } from './jogo/jogo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ApresentacaoComponent, InstrucoesComponent, JogoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tela: 'apresentacao' | 'instrucoes' | 'jogo' = 'apresentacao';

  irParaInstrucoes() {
    this.tela = 'instrucoes';
  }

  iniciarJogo() {
    this.tela = 'jogo';
  }
}
