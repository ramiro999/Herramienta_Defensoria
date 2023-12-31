import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DerechoDePeticionComponent } from './derecho-de-peticion/derecho-de-peticion.component';
import { HabeasCorpusComponent } from './habeas-corpus/habeas-corpus.component';
import { HabeasDataComponent } from './habeas-data/habeas-data.component';
import { AccionDeTutelaComponent } from './accion-de-tutela/accion-de-tutela.component';
import { AccionPopularComponent } from './accion-popular/accion-popular.component';
import { AccionDeGrupoComponent } from './accion-de-grupo/accion-de-grupo.component';
import { AccionDeCumplimientoComponent } from './accion-de-cumplimiento/accion-de-cumplimiento.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RequestService } from './services/request.service';
import { DocgeneratorService } from './services/docgenerator.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartaRenuenciaAcComponent } from './carta-renuencia-ac/carta-renuencia-ac.component';
import { CartaRenuenciaApComponent } from './carta-renuencia-ap/carta-renuencia-ap.component';
import { HabeasCorpusPComponent } from './habeas-corpus-p/habeas-corpus-p.component';


@NgModule({
  declarations: [
    AppComponent,
    DerechoDePeticionComponent,
    HabeasCorpusComponent,
    HabeasDataComponent,
    AccionDeTutelaComponent,
    AccionPopularComponent,
    AccionDeGrupoComponent,
    AccionDeCumplimientoComponent,
    HomeComponent,
    NavbarComponent,
    CartaRenuenciaAcComponent,
    CartaRenuenciaApComponent,
    HabeasCorpusPComponent,        

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [RequestService, DocgeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
