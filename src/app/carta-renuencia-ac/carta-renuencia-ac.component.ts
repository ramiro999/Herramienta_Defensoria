import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';

declare var bootstrap: any;

@Component({
  selector: 'app-carta-renuencia-ac',
  templateUrl: './carta-renuencia-ac.component.html',
  styleUrls: ['./carta-renuencia-ac.component.css']
})
export class CartaRenuenciaAcComponent {
  
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
  
  CartaRenuenciaAc!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private docGenerator: DocgeneratorService,
    ) {}

  ngOnInit(): void {
    this.CartaRenuenciaAc = this.initForm();
    // Configurar el contenido personalizado para el tooltip

  }

  ngAfterViewInit(): void {
    // Inicializar los tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  onSubmit() {
    this.docGenerator.generateDocx(
      'assets/formats/template-carta-renuencia-ac.docx',
      //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
      this.CartaRenuenciaAc.value,
      'carta-renuencia-ac');


    console.log('Formulario enviado', this.CartaRenuenciaAc.value);
  }

  initForm(): FormGroup {
    return this.fb.group({
      fecha: ['', Validators.required],
      ciudad: ['', Validators.required],
      nombreAutoridad: ['', Validators.required],
      ciudadAutoridad: ['', Validators.required],
      direccionAutoridad: ['', Validators.required],
      articuloIncumplido: ['', Validators.required],
      autoridadIncumple: ['', Validators.required],
      hechos: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
      nombreSolicitante: ['', Validators.required],
      cedulaSolicitante: ['', Validators.required],
      telefonoSolicitante: ['', Validators.required],
      direccionSolicitante: ['', Validators.required],
      cedulaExpedicion: ['', Validators.required],
      ciudadSolicitante: ['', Validators.required],

    });
  }

  // https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_

  crearHechoFormGroup(): FormGroup {
    return this.fb.group({
      contenido: ['', Validators.required]
    });
  }

  agregarHecho() {
    const hechosArray = this.CartaRenuenciaAc.get('hechos') as FormArray;
    hechosArray.push(this.crearHechoFormGroup());
    console.log(this.CartaRenuenciaAc.controls)
  }

  eliminarHecho(){
    const hechosArray = this.CartaRenuenciaAc.get('hechos') as FormArray;
    if(hechosArray.length > 1){
      hechosArray.removeAt(hechosArray.length - 1);
    }
    
  }

  get hechos(): FormArray {
    return this.CartaRenuenciaAc.get('hechos') as FormArray;
  }

 // get inputValid(inputName: string) {
  //  const input = this.AccionDeCumplimiento.get(inputName)?.invalid;
   // return input && this.AccionDeCumplimiento.get(inputName)?.touched;
 // }


}
