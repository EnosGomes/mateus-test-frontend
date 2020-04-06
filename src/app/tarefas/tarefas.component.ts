import { Component, OnInit } from '@angular/core';
import { Tarefa } from './tarefa';
import { TarefaService } from './tarefa.service';
import Swal from 'sweetalert2'
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html'
})
export class TarefasComponent implements OnInit {

 tarefas: Tarefa[];
  paginador: any;

  constructor(
    private tarefaService: TarefaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.tarefaService.getTarefas(page).pipe(
        tap(response => {
          (response.content as Tarefa[]).forEach(tarefa => {
          });
        })
      ).subscribe(response => {
        this.tarefas = response.content as Tarefa[];
        this.paginador = response;
      });
    }
    );
  }

  delete(tarefa: Tarefa): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn ml-3 btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Tem certeza?',
      text: `Tem certeza que quer eliminar essa tarefa ${tarefa.titulo} }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, eliminar!',
      cancelButtonText: 'Não, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.tarefaService.delete(tarefa.id).subscribe(
          response => {
            this.tarefas = this.tarefas.filter(cli => cli !== tarefa)
            swalWithBootstrapButtons.fire(
              'Eliminado',
              `Tarefa ${tarefa.titulo} eliminada sucesso`,
              'success'
            )
          }
        )
      }
    })
  }

}
