import { Component, OnInit } from '@angular/core';
import { Projeto } from './projeto';
import { ProjetoService } from './projeto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    
    if(value.length > 2) {
      this._listFilter = value;
       this.filteredProjects = this.performFilter(this.listFilter);
    } else {
      this._listFilter = '';
      this.filteredProjects = this.projetos;
    }   
  }

  filteredProjects: Projeto[];
  projetos: Projeto[];

  constructor(
    private projetoService: ProjetoService) {
    this.filteredProjects = this.projetos;
  }

  ngOnInit() {
    this.projetoService.getProjetos()
    .subscribe(data => this.projetos = data);    
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
            this.projetoService.getProjetos()
                      .subscribe(data => this.projetos = data) ;
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
