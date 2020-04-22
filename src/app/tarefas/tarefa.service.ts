import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Tarefa } from './tarefa';
import { Projeto } from '../projetos/projeto';
import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2'

@Injectable()
export class TarefaService {
  private urlEndPoint: string = 'http://localhost:8181/api/v1/tarefas';
  private urlProjetos: string = 'http://localhost:8181/api/v1/projetos/all';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getTarefas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Tarefa[]).forEach(tarefa => {
        }
        )
      }),
      tap(response => {
        (response.content as Tarefa[]).forEach(tarefa => {
        }
        )
      })
    );
  }

  create(tarefa: Tarefa): Observable<any> {
   
    return this.http.post<any>(this.urlEndPoint, tarefa, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(
          e.error.erros[0],
           e.error.error,
            'error');
        return throwError(e);
      })
    );
  }

  getTarefa(id): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/tarefas']);
        console.error(e.error.mensaje);
        Swal.fire('Erro em editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(tarefa: Tarefa): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${tarefa.id}`, tarefa, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        this.router.navigate(['/tarefas']);
        Swal.fire(e.error.mensaje, e.error.error, 'success');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getProjetos(): Observable<any> {
    return this.http.get(this.urlProjetos);
  }

}