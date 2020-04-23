import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto';
import { Tarefa } from '../tarefas/tarefa';
import { TarefaService } from '../tarefas/tarefa.service';
import { ProjetoService } from './projeto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class ProjetoFormComponent implements OnInit {

   minDate = new Date();

  public projetos: Observable<Projeto>[];
  private projeto: Projeto = new Projeto();
  private tarefa: Tarefa = new Tarefa();
  private titulo: string = "Criar Projeto";

  private errores: string[];

  constructor(private projetoService: ProjetoService,
    private tarefaService: TarefaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.carregarProjeto();
    this.carregarTarefa();
    this.tarefaService.getProjetos()
      .subscribe(data => this.projetos = data);
    ;
  }

  carregarProjeto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.projetoService.getProjeto(id).subscribe((projeto) => this.projeto = projeto)
      }
    })
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
    this.projetoService.create(this.projeto)
      .subscribe(json => {
        this.router.navigate(['/projetos']);
        Swal.fire(
          'Sucesso',
          `Projeto criado.`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
      }
      );
  }

  update(): void {
    this.projetoService.update(this.projeto)
      .subscribe(json => {
        this.router.navigate(['/projetos']);
        Swal.fire(
          'Sucesso',
          `Projeto foi atualizado .`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
      }
      )
  }

}
