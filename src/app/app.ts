import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importamos componente de la lista
import { MovieList } from './components/movie-list/movie-list'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // RÚBRICA: Agregamos MovieList a los imports
  imports: [ MovieList], 
  templateUrl: './app.html' 
})
export class App {
  title = 'Cinema UVEG';
}