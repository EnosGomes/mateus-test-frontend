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
  projetos2: Projeto[];
  paginador: any;

  constructor(

    private projetoService: ProjetoService,
    private activatedRoute: ActivatedRoute) {

    this.filteredProjects = this.projetos;
  }

  ngOnInit() {

    this.projetoService.getProjetos2()
    .subscribe(data => this.projetos2 = data);    
  }

  performFilter(filterBy: string): Projeto[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projetos2.filter((projeto: Projeto) =>
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
      text: `Tem certeza que deseja excluir o projeto ${projeto.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não, cancelar.',
      confirmButtonText: 'Sim, excluir!',      
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.projetoService.delete(projeto.id).subscribe(
          response => {
            this.projetoService.getProjetos2()
                      .subscribe(data => this.projetos2 = data) ;
            swalWithBootstrapButtons.fire(
              'Excluído',
              `Projeto ${projeto.titulo} excluído com sucesso`,
              'success'
            )
          }
        )
      }
    })
  }

}
