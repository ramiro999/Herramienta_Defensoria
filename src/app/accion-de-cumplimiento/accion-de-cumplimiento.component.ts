import { Component, OnInit, AfterViewInit} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RequestService } from '../services/request.service';

import { DocgeneratorService } from '../services/docgenerator.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any; 
@Component({
  selector: 'app-accion-de-cumplimiento',
  templateUrl: './accion-de-cumplimiento.component.html',
  styleUrls: ['./accion-de-cumplimiento.component.css']
})
export class AccionDeCumplimientoComponent {

  model: string | null = null; // Para almacenar la fecha seleccionada

  toggleDatepicker() {
    const dateInput = document.getElementById('fecha') as HTMLInputElement;
    if (dateInput) {
      dateInput.click(); // Abre el datepicker
    }
  }

  onDateChange(event: Event) {
    const dateInput = event.target as HTMLInputElement;
    this.model = dateInput.value; // Almacena la fecha seleccionada en la variable 'model'
  }


  AccionDeCumplimiento!: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder, 
    private docGenerator: DocgeneratorService,
    ) {}

  ngOnInit(): void {
    this.AccionDeCumplimiento = this.initForm();
    // Configurar el contenido personalizado para el tooltip

  }

  ngAfterViewInit(): void {
    // Inicializar los tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
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
