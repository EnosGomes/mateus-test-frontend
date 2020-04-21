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

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProjects = this.listFilter ? this.performFilter(this.listFilter) : this.projetos;
  }
  filteredProjects: Projeto[];
  projetos: Projeto[];
  paginador: any;

  constructor(
    
    private projetoService: ProjetoService,
    private activatedRoute: ActivatedRoute) { 

      this.filteredProjects = this.projetos;
      this.listFilter = '';
    }

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

  performFilter(filterBy: string): Projeto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projetos.filter((projeto: Projeto) =>
      projeto.titulo.toLocaleLowerCase().indexOf(filterBy) !== -1);
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
      title: 'Tem certeza',
      text: `Tem certeza que quer eliminar o projeto ${projeto.titulo} }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, eliminar!',
      cancelButtonText: 'Não, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.projetoService.delete(projeto.id).subscribe(
          response => {
            this.projetos = this.projetos.filter(cli => cli !== projeto)
            swalWithBootstrapButtons.fire(
              'Deletado',
              `Projeto ${projeto.titulo} eliminado com sucesso`,
              'success'
            )
          }
        )
      }
    })
  }

}
