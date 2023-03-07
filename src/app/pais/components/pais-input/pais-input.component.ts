import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
export class PaisInputComponent implements OnInit {
  // Emitiendo el término de búsqueda
  @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();

  // Sugerencias
  @Output() onDebounce: EventEmitter<string> = new EventEmitter<string>();

  // Recibir el placeholder
  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject<string>();

  termino: string = '';

  ngOnInit() {
    // Se ejecuté cada 300 ms
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      // console.log('debouncer:', valor);
      this.onDebounce.emit(valor);
    });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }
}
