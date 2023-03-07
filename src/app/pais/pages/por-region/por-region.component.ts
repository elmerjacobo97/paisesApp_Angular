import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  hayError: boolean = false;
  isLoading: boolean = false;
  paises: Country[] = [];

  getClaseCSS(region: string): string {
    return region === this.regionActiva ? 'bg-sky-700' : 'bg-sky-600';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) return;

    this.regionActiva = region;
    this.paises = [];
    this.hayError = false;
    this.isLoading = true;

    // Hacer el llamado a mi servicio
    this.paisService.getRegion(region).subscribe(
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

  constructor(private paisService: PaisService) {}
}
