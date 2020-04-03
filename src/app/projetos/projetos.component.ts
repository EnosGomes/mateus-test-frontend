import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto';
import { ProjetoService } from './projeto.service';
import Swal from 'sweetalert2'
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html'
})
export class ProjetosComponent implements OnInit {

  projetos: Projeto[];
  paginador: any;

  constructor(
    private projetoService: ProjetoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.projetoService.getProjetos(page).pipe(
        tap(response => {
          (response.content as Projeto[]).forEach(projeto => {
          });
        })
      ).subscribe(response => {
        this.projetos = response.content as Projeto[];
        this.paginador = response;
      });
    }
    );
  }

  delete(projeto: Projeto): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn ml-3 btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al projeto ${projeto.titulo} }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.projetoService.delete(projeto.id).subscribe(
          response => {
            this.projetos = this.projetos.filter(cli => cli !== projeto)
            swalWithBootstrapButtons.fire(
              'Eliminado',
              `Projeto ${projeto.titulo} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    })
  }

}
