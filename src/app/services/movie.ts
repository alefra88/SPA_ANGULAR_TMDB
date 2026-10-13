import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.themoviedb.org/3/movie';
  private token = ''; //  aquí  Read Access Token

  private getHeaders() {
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) };
  }

  // Método para películas mejor valoradas
//   getMejorValoradas() {
//     return this.http.get(`${this.apiUrl}/top_rated?language=es-MX`, this.getHeaders());
//   }
// 1. La función que carga las listas
  getPeliculasPorCategoria(categoria: string) {
    // Le pasamos this.getHeaders() directo como segundo parámetro
    return this.http.get(`${this.apiUrl}/${categoria}?language=es-MX`, this.getHeaders());
  }

  // 2. La función que carga el modal 
  getDetallePelicula(id: number) {
    return this.http.get(`${this.apiUrl}/${id}?language=es-MX`, this.getHeaders());
  }
}