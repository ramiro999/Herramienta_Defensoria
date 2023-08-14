import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';

declare var bootstrap: any;

@Component({
  selector: 'app-derecho-de-peticion',
  templateUrl: './derecho-de-peticion.component.html',
  styleUrls: ['./derecho-de-peticion.component.css']
})
export class DerechoDePeticionComponent {

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

  DerechoDePeticion!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private docGenerator: DocgeneratorService,
    ) {}

  ngOnInit(): void {
    this.DerechoDePeticion = this.initForm();
    // Configurar el contenido personalizado para el tooltip

  }

  ngAfterViewInit(): void {
    // Inicializar los tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  onSubmit() {
    this.docGenerator.generateDocx(
      'http://localhost:4200/assets/formats/template-derecho-de-peticion.docx',
      //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
      this.DerechoDePeticion.value,
      'derecho-de-peticion');
      
    console.log('Formulario enviado', this.DerechoDePeticion.value);
  
  }
  initForm(): FormGroup {
    return this.fb.group({
      fecha: ['', Validators.required],
      ciudad: ['', Validators.required],
      destinatario: ['', Validators.required],
      cargoDestinatario: ['', Validators.required],
      ciudadDestinatario: ['', Validators.required],
      solicitud: ['', Validators.required],
      adjunto: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
      nombreSolicitante: ['', Validators.required],
      cedulaSolicitante: ['', Validators.required],
      cedulaExpedicion: ['', Validators.required],
      direccionSolicitante: ['', Validators.required],
      telefonoSolicitante: ['', Validators.required],
      correoSolicitante: ['', Validators.required],
    });
  }

  // https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_

  crearAdjuntoFormGroup(): FormGroup {
    return this.fb.group({
      contenido: ['', Validators.required]
    });
  }

  agregarAdjunto() {
    const adjuntoArray = this.DerechoDePeticion.get('adjunto') as FormArray;
    adjuntoArray.push(this.crearAdjuntoFormGroup());
    console.log(this.DerechoDePeticion.controls)
  }

  eliminarAdjunto() {
    const adjuntoArray = this.DerechoDePeticion.get('adjunto') as FormArray;
    if(adjuntoArray.length > 1){
    adjuntoArray.removeAt(adjuntoArray.length - 1);
  }
  }
  

  get adjunto(): FormArray {
    return this.DerechoDePeticion.get('adjunto') as FormArray;
  }

 // get inputValid(inputName: string) {
  //  const input = this.AccionDeCumplimiento.get(inputName)?.invalid;
   // return input && this.AccionDeCumplimiento.get(inputName)?.touched;
 // }


}





