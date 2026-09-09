import { Component, inject, effect, signal } from '@angular/core';
import { MovieService } from '../../services/movie';
import { MovieDetail } from '../movie-detail/movie-detail'; 

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieDetail], 
  templateUrl: './movie-list.html'
})
export class MovieList {
  private movieService = inject(MovieService);
  
  peliculas = signal<any[]>([]);
  idSeleccionado = signal<number | null>(null);
  
  // 1. Creamos un Signal para controlar la categoría (por defecto 'top_rated')
  categoriaActual = signal<string>('top_rated');

  constructor() {
    // 2. effect() vigila "categoriaActual". Si el valor cambia, vuelve a ejecutar la petición.
    effect(() => {
      this.movieService.getPeliculasPorCategoria(this.categoriaActual()).subscribe({
        next: (respuesta: any) => this.peliculas.set(respuesta.results),
        error: (err) => console.error('Error al cargar películas', err)
      });
    });
  }

  // 3. Método para que los botones cambien el Signal
  cambiarCategoria(nuevaCategoria: string) {
    this.categoriaActual.set(nuevaCategoria);
  }

  verDetalle(id: number) {
    this.idSeleccionado.set(id);
  }

  cerrarDetalle() {
    this.idSeleccionado.set(null);
  }
}