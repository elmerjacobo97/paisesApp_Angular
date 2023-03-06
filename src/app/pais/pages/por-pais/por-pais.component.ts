import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  isLoading: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar() {
    this.hayError = false;

    this.isLoading = true;
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        console.log(paises);
        this.paises = paises;
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
