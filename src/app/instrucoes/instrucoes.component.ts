import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-instrucoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instrucoes.component.html',
  styleUrls: ['./instrucoes.component.scss']
})
export class InstrucoesComponent {
    @Output() fechar = new EventEmitter<void>();

  irParaJogo() {
    // implemente a navegação ou comunicação com app.component
  }
}
