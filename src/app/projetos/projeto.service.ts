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
  private urlEndPoint1: string = 'http://localhost:8181/api/v1/projetos/all';
  private urlEndPoint: string = 'http://localhost:8181/api/v1/projetos';
  //private urlEndPointProd: string = 'https://test-mateus.herokuapp.com/api/v1/projetos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getProjetos(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Projeto[]).forEach(projeto => {

        }
        )
      }),

      tap(response => {
        (response.content as Projeto[]).forEach(projeto => {

        }
        )
      })
    );
  }

  create(projeto: Projeto): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, projeto, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (e.status == 400) {
          Swal.fire(
            'Falha!',
            e.error.erros[0],
            'error');
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getProjeto(id): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/projetos']);
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
        this.router.navigate(['/projetos']);
        Swal.fire(e.error.mensaje, e.error.error, 'success');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Projeto> {
    return this.http.delete<Projeto>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        console.log(e);
        Swal.fire('Erro ao excluir o projeto!',
           e.error.message, 
           'error');
        return throwError(e);
      })
    );
  }

  getProjetos2(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.urlEndPoint1}`).pipe(
      catchError(e => {
        this.router.navigate(['/projetos']);
        Swal.fire('Erro em editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
