import { Component, OnInit} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RequestService } from '../services/request.service';

import { DocgeneratorService } from '../services/docgenerator.service';


@Component({
  selector: 'app-accion-de-cumplimiento',
  templateUrl: './accion-de-cumplimiento.component.html',
  styleUrls: ['./accion-de-cumplimiento.component.css']
})
export class AccionDeCumplimientoComponent {

  AccionDeCumplimiento!: FormGroup;

  constructor(private readonly fb: FormBuilder, private docGenerator: DocgeneratorService) { }

  ngOnInit(): void {
    this.AccionDeCumplimiento = this.initForm();

  }

  
  


  onSubmit() {
    this.docGenerator.generateDocx(
      'http://localhost:4200/assets/formats/template-accion-de-cumplimiento.docx',
      //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
      this.AccionDeCumplimiento.value,
      'accion-de-cumplimiento');


    console.log('Formulario enviado', this.AccionDeCumplimiento.value);
  }

  initForm(): FormGroup {
    return this.fb.group({
      ciudad: [''],
      fecha: [''],
      localidadJuez: [''],
      nombreDemandado: [''],
      nombreDemandante: [''],
      cedulaDemandante: [''],
      ciudadCedula: [''],
      normaIncumplida: [''],
      hechos: [''],
      autoridadIncumple: [''],
      pretension: [''],
      ciudadDemandado: [''],
      direccionDemandado: [''],
      telefonoDemandado: [''],
      correoDemandado: [''],
      ciudadDemandante: [''],
      direccionDemandante: [''],
      telefonoDemandante: [''],
      correoDemandante: ['']
    });
  }

  // https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_



}
