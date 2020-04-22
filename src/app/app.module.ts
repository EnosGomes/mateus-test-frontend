import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { ProjetoFormComponent } from './projetos/projetoform.component';
import { TarefaFormComponent } from './tarefas/tarefaform.component';
import { ProjetoService } from './projetos/projeto.service';
import { TarefaService } from './tarefas/tarefa.service';

import localeEs from '@angular/common/locales/es';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

registerLocaleData(localeEs, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ProjetosComponent,
    TarefasComponent,
    ProjetoFormComponent,
    TarefaFormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    ProjetoService,
    TarefaService,
    {provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
