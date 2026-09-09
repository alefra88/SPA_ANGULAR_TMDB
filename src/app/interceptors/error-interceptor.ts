import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('Error interceptado globalmente:', error);
      let mensajeError = 'Ocurrió un error inesperado.';
      
      if (error.status === 401) {
        mensajeError = 'Error 401: No autorizado. Verifica tu Token de TMDB.';
      } else if (error.status === 404) {
        mensajeError = 'Error 404: El recurso no fue encontrado.';
      } else if (error.status === 500) {
        mensajeError = 'Error 500: Fallo en el servidor de TMDB.';
      }

      alert(mensajeError);
      return throwError(() => new Error(mensajeError));
    })
  );
};