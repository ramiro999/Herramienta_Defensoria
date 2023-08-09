import { Component, OnInit, AfterViewInit} from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

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
      ciudad: ['', Validators.required],
      fecha: ['', Validators.required],
      ciudadJuez: ['', Validators.required],
      direccionJuez: ['', Validators.required],
      nombreDemandado: ['', Validators.required],
      nombreDemandante: ['', Validators.required],
      cedulaDemandante: ['', Validators.required],
      ciudadCedula: ['', Validators.required],
      normaIncumplida: ['', Validators.required],
      autoridadIncumple: ['', Validators.required],
      pretension: ['', Validators.required],
      ciudadDemandado: ['', Validators.required],
      direccionDemandado: ['', Validators.required],
      telefonoDemandado: ['', Validators.required],
      correoDemandado: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      ciudadDemandante: ['', Validators.required],
      direccionDemandante: ['', Validators.required],
      telefonoDemandante: ['', Validators.required],
      correoDemandante: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      hechos: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
    });
  }

  // https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_

  crearHechoFormGroup(): FormGroup {
    return this.fb.group({
      contenido: ['', Validators.required]
    });
  }

  agregarHecho() {
    const hechosArray = this.AccionDeCumplimiento.get('hechos') as FormArray;
    hechosArray.push(this.crearHechoFormGroup());
    console.log(this.AccionDeCumplimiento.controls)
  }

  eliminarHecho() {
    const hechosArray = this.AccionDeCumplimiento.get('hechos') as FormArray;
    if (hechosArray.length > 1) {
      hechosArray.removeAt(hechosArray.length - 1);
    }
  }

  get hechos(): FormArray {
    return this.AccionDeCumplimiento.get('hechos') as FormArray;
  }

 // get inputValid(inputName: string) {
  //  const input = this.AccionDeCumplimiento.get(inputName)?.invalid;
   // return input && this.AccionDeCumplimiento.get(inputName)?.touched;
 // }

}
