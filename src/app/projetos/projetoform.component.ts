import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto'
import { ProjetoService } from './projeto.service'
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class ProjetoFormComponent implements OnInit {

  private projeto: Projeto = new Projeto()
  private titulo: string = "Criar Projeto";

  private errores: string[];

  constructor(private projetoService: ProjetoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarProjeto()
  }

  cargarProjeto(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.projetoService.getProjeto(id).subscribe((projeto) => this.projeto = projeto)
      }
    })
  }

  create(): void {
<<<<<<< HEAD
    console.log("create chamado");
=======
>>>>>>> 8e0f7d065fcf2e8667906ced749504d11bb9bfd5
    this.projetoService.create(this.projeto)
      .subscribe(json => {
        this.router.navigate(['/projetos']);
        Swal.fire(
          'Novo projeto',
          `${json.mensaje}: Projeto ${json.projeto.titulo}`,
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
<<<<<<< HEAD
          'Projeto Atualizado',
=======
          'Projeto Actualizado',
>>>>>>> 8e0f7d065fcf2e8667906ced749504d11bb9bfd5
          `${json.mensaje}: Projeto ${json.projeto.titulo}`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
      }
      )
  }

}
