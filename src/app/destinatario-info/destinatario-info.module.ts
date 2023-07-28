import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinatarioFormComponent } from './destinatario-form/destinatario-form.component';
import { PeticionFormComponent } from './peticion-form/peticion-form.component';



@NgModule({
  declarations: [
    DestinatarioFormComponent,
    PeticionFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DestinatarioInfoModule { }
