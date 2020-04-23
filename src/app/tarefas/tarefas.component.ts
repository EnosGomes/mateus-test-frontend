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

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    
    if(value.length > 2) {
      this._listFilter = value;
       this.filteredTarefas = this.performFilter(this.listFilter);
    } else {
      this._listFilter = '';
      this.filteredTarefas = this.tarefas;
    }   
  }

  filteredTarefas: Tarefa[];

  tarefas: Tarefa[];
  paginador: any;

  constructor(
    private tarefaService: TarefaService,
    private activatedRoute: ActivatedRoute) { 
     
    }

  ngOnInit() {
    this.tarefaService.getTarefas2()
      .subscribe(data => this.tarefas = data);

      this.listFilter = '';
      this.filteredTarefas = this.tarefas;
  }

  performFilter(filterBy: string): Tarefa[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.tarefas.filter(
      (projeto: Tarefa) => projeto.titulo.toLocaleLowerCase().indexOf(filterBy) !== -1);
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
      title: 'Tem certeza',
      text: `Tem certeza que deseja excluir a tarefa ${tarefa.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não, cancelar.',
      confirmButtonText: 'Sim, excluir!',      
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.tarefaService.delete(tarefa.id).subscribe(
          response => {
            this.tarefaService.getTarefa2()
                      .subscribe(data => this.tarefas = data) ;
            swalWithBootstrapButtons.fire(
              'Excluído',
              `Tarefa ${tarefa.titulo} excluído com sucesso`,
              'success'
            )
          }
        )
      }
    })
  }

}