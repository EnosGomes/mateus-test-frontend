import { Component, OnInit } from '@angular/core';
import { Tarefa } from './tarefa'
import { TarefaService } from './tarefa.service'
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private tarefa: Tarefa = new Tarefa()
  private titulo: string = "Criar Tarefa";

  private errores: string[];

  constructor(private tarefaService: TarefaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarTarefa()
  }

  cargarTarefa(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.tarefaService.getTarefa(id).subscribe((tarefa) => this.tarefa = tarefa)
      }
    })
  }

  create(): void {
    this.tarefaService.create(this.tarefa)
      .subscribe(json => {
        this.router.navigate(['/tarefas']);
        Swal.fire(
          'Nova tarefa',
          `${json.mensaje}: Tarefa ${json.tarefa.titulo}`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
      }
      );
  }

  update(): void {
    this.tarefaService.update(this.tarefa)
      .subscribe(json => {
        this.router.navigate(['/tarefas']);
        Swal.fire(
          'Tarefa atualizada',
          `${json.mensaje}: Tarefa ${json.tarefa.titulo}`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
      }
      )
  }

}
