import { ProjetosComponent } from './projetos/projetos.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetoFormComponent } from './projetos/projetoform.component';
import { TarefaFormComponent } from './tarefas/tarefaform.component';


const routes: Routes = [
  {path: '', redirectTo: '/projetos', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'projetos', component: ProjetosComponent},
  {path: 'projetos/page/:page', component: ProjetosComponent},
  {path: 'projetos/form', component: ProjetoFormComponent},
  {path: 'projetos/form/:id', component: ProjetoFormComponent},
  
  {path: 'tarefas', component: TarefasComponent},
  {path: 'tarefas/page/:page', component: TarefasComponent},
  {path: 'tarefas/form', component: TarefaFormComponent},
  {path: 'tarefas/form/:id', component: TarefaFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
