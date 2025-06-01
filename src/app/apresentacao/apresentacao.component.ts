import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss'],
})
export class ApresentacaoComponent {
  @Output() continuar = new EventEmitter<void>();

  confirmar() {
    this.continuar.emit();
  }
}