import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccionDeCumplimientoComponent } from './accion-de-cumplimiento/accion-de-cumplimiento.component';
import { AccionDeGrupoComponent } from './accion-de-grupo/accion-de-grupo.component';
import { AccionDeTutelaComponent } from './accion-de-tutela/accion-de-tutela.component';
import { AccionPopularComponent } from './accion-popular/accion-popular.component';
import { DerechoDePeticionComponent } from './derecho-de-peticion/derecho-de-peticion.component';
import { HabeasCorpusComponent } from './habeas-corpus/habeas-corpus.component';
import { HabeasDataComponent } from './habeas-data/habeas-data.component';
import { HomeComponent } from './home/home.component';
import { CartaRenuenciaAcComponent } from './carta-renuencia-ac/carta-renuencia-ac.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'accion-de-cumplimiento', component: AccionDeCumplimientoComponent },
  { path: 'accion-de-grupo', component: AccionDeGrupoComponent },
  { path: 'accion-de-tutela', component: AccionDeTutelaComponent },
  { path: 'accion-popular', component: AccionPopularComponent },
  { path: 'derecho-de-peticion', component: DerechoDePeticionComponent },
  { path: 'habeas-corpus', component: HabeasCorpusComponent },
  { path: 'habeas-data', component: HabeasDataComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carta-renuencia-ac', component: CartaRenuenciaAcComponent}
]

@NgModule({   
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
