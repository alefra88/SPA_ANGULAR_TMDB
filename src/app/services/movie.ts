import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.themoviedb.org/3/movie';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGZhYjhkMTg1ZWRhNzA4ZTg3YWRlODQ5OTA0NGMzMiIsIm5iZiI6MTczOTMzMDIxNS4wNzUsInN1YiI6IjY3YWMxMmE3NmViMzZkMGRhZDliYzNjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dk7gptJzSK26NTQGzXm8UAZ1G3TTnf_ttHIeTtWWp9E'; //  aquí  Read Access Token

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