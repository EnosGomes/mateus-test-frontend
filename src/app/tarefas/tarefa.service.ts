import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Tarefa } from './tarefa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2'

@Injectable()
export class TarefaService {
  private urlEndPoint: string = 'http://localhost:8080/api/v1/tarefas';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  getTarefas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Tarefa[]).forEach(tarefa => {
          console.log(tarefa.titulo);
        }
        )
      }),
      map((response: any) => { 
        (response.content as Tarefa[]).map(tarefa => {
          tarefa.titulo = tarefa.titulo.toUpperCase();
          
          return tarefa;
        });
        return response;
      }),
      tap(response => {
        (response.content as Tarefa[]).forEach(tarefa => {
          console.log(tarefa.titulo);
        }
        )
      })
    );
  }

  create(tarefa: Tarefa): Observable<any> {
    console.log("teste do console"+tarefa.titulo);
    return this.http.post<any>(this.urlEndPoint, tarefa, { headers: this.httpHeaders }).pipe(
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

  update(projeto: Tarefa): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${projeto.id}`, projeto, { headers: this.httpHeaders }).pipe(
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

}