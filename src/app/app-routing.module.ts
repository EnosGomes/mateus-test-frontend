import { ProjetosComponent } from './projetos/projetos.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './projetos/form.component';


const routes: Routes = [
  {path: '', redirectTo: '/projetos', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'projetos', component: ProjetosComponent},
  {path: 'projetos/page/:page', component: ProjetosComponent},
  {path: 'projetos/form', component: FormComponent},
  {path: 'projetos/form/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
