import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Projeto } from './projeto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2'

@Injectable()
export class ProjetoService {
  private urlEndPoint: string = 'http://localhost:8181/api/v1/projetos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getProjetos(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Projeto[]).forEach(projeto => {
          console.log(projeto.titulo);
        }
        )
      }),
      map((response: any) => { 
        (response.content as Projeto[]).map(projeto => {
          projeto.titulo = projeto.titulo.toUpperCase();
          //projeto.createAt = formatDate(projeto.createAt, 'EEEE dd, MMMM yyyy', 'es');
          return projeto;
        });
        return response;
      }),
      tap(response => {
        (response.content as Projeto[]).forEach(projeto => {
          console.log(projeto.titulo);
        }
        )
      })
    );
  }

  create(projeto: Projeto): Observable<any> {
    console.log(projeto);
    return this.http.post<any>(this.urlEndPoint, projeto, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getProjeto(id): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/projetos']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(projeto: Projeto): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${projeto.id}`, projeto, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        this.router.navigate(['/projetos']);
        Swal.fire(e.error.mensaje, e.error.error, 'success');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Projeto> {
    return this.http.delete<Projeto>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
