import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';

declare var bootstrap: any;

@Component({
  selector: 'app-habeas-data',
  templateUrl: './habeas-data.component.html',
  styleUrls: ['./habeas-data.component.css']
})
export class HabeasDataComponent {
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

  HabeasData!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private docGenerator: DocgeneratorService,
    ) {}

  ngOnInit(): void {
    this.HabeasData = this.initForm();
    // Configurar el contenido personalizado para el tooltip

  }

  ngAfterViewInit(): void {
    // Inicializar los tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  onSubmit() {
    this.docGenerator.generateDocx(
      'assets/formats/template-habeas-data.docx',
      //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
      this.HabeasData.value,
      'habeas-data');
      
    console.log('Formulario enviado', this.HabeasData.value);
  
  }
  initForm(): FormGroup {
    return this.fb.group({
      ciudad: ['', Validators.required],
      fecha: ['', Validators.required],
      nombreDirige: ['', Validators.required],
      cargoDirige: ['', Validators.required],
      ciudadDirige: ['', Validators.required],
      tipoSolicitud : ['', Validators.required],
      nombreEntidad: ['', Validators.required],
      referencia: ['', Validators.required],
      hechos: this.fb.array([this.crearHechoFormGroup()]),
      nombreSolicitante: ['', Validators.required],
      cedulaSolicitante: ['', Validators.required],
      direccionSolicitante: ['', Validators.required],
      telefonoSolicitante: ['', Validators.required],
      correoSolicitante: ['', Validators.required],
      cedulaExpedicion: ['', Validators.required],
    });
}

crearHechoFormGroup(): FormGroup {
  return this.fb.group({
    contenido: ['', Validators.required]
  });
}

agregarHecho() {
  const hechosArray = this.HabeasData.get('hechos') as FormArray;
  hechosArray.push(this.crearHechoFormGroup());
  console.log(this.HabeasData.controls)
}

eliminarHecho() {
  const hechosArray = this.HabeasData.get('hechos') as FormArray;
  if (hechosArray.length > 1) {
    hechosArray.removeAt(hechosArray.length - 1);
  }
}

get hechos(): FormArray {
  return this.HabeasData.get('hechos') as FormArray;
}

}
