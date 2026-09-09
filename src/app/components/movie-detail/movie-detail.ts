import { Component, inject, input, output, effect, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common'; 
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [DecimalPipe], 
  templateUrl: './movie-detail.html'
})
export class MovieDetail {
  id = input.required<number>(); 
  // Creamos un evento de salida para avisar que se cerró el modal
  cerrar = output<void>(); 
  
  private movieService = inject(MovieService);
  detalle = signal<any>(null);

  constructor() {
    effect(() => {
      const currentId = this.id(); 
      if (currentId) {
        this.movieService.getDetallePelicula(currentId).subscribe({
          next: (data) => this.detalle.set(data),
          error: (err) => console.error('Error al cargar detalle', err)
        });
      }
    });
  }

  // Método que emite la señal de cierre
  cerrarModal() {
    this.cerrar.emit();
  }
}