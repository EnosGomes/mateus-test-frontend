import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {


  habilitar: boolean = true;
  constructor() { }

  setHabilitar(){
    this.habilitar = !this.habilitar;
  }
}
