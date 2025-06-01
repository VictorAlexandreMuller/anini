import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-instrucoes',
  standalone: true,
  templateUrl: './instrucoes.component.html',
  styleUrls: ['./instrucoes.component.scss']
})
export class InstrucoesComponent {
  @Output() entendi = new EventEmitter<void>();
}
