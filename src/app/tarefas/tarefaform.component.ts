import { Component, OnInit } from '@angular/core';
import { Tarefa } from './tarefa'
import { Projeto } from '../projetos/projeto';
import { Observable } from 'rxjs/internal/Observable';
import { TarefaService } from './tarefa.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class TarefaFormComponent implements OnInit {

  public projetos: Observable<Projeto>[];
  private tarefa: Tarefa = new Tarefa();
  private titulo: string = "Criar Tarefa";

  private errores: string[];

  constructor(private tarefaService: TarefaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.carregarTarefa();    

    this.tarefaService.getProjetos()
      .subscribe(data => this.projetos = data);    
  }

  carregarTarefa(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.tarefaService.getTarefa(id).subscribe((tarefa) => this.tarefa = tarefa)
      }
    })
  }

  create(): void {
    console.log(this.tarefa);
    this.tarefaService.create(this.tarefa)
      .subscribe(json => {
        this.router.navigate(['/tarefas']);
        Swal.fire(
          'Nova tarefa',
          ` Tarefa ${this.tarefa.titulo}`,
          'success'
        )
      },
      err => {
        Swal.fire(
          'Ops!',
           'Já existe uma tarefa com esse título nesse projeto.',
            'error');
        this.errores = err.error as string[];
      }
      );
  }

  update(): void {
    this.tarefaService.update(this.tarefa)
      .subscribe(json => {
        this.router.navigate(['/tarefas']);
        Swal.fire(
          'Tarefa atualizada',
          `${json.tarefa.titulo}: Tarefa ${json.tarefa.titulo}`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
      }
      )
  }

}
