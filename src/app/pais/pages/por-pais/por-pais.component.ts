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
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.isLoading = true;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
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

  sugerencias(termino: string) {
    if (termino.length === 0) return;
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    // Crear las sugerencias
    this.paisService.buscarPais(termino).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 5)),
      (error) => {
        this.hayError = true;
        this.termino = '';
        this.paisesSugeridos = [];
        this.mostrarSugerencias = false;
      }
    );
  }
}
