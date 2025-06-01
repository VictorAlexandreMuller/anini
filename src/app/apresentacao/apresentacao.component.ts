import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-apresentacao',
  standalone: true,
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent {
  @Output() continuar = new EventEmitter<void>();
}
