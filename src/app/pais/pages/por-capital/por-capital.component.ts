import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  isLoading: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.isLoading = true;
    this.termino = termino;

    this.paisService.buscarCapital(termino).subscribe(
      (capitals) => {
        this.paises = capitals;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.hayError = true;
        this.paises = [];
        this.isLoading = false;
      }
    );
  }
}
