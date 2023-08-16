import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DocgeneratorService } from '../services/docgenerator.service';

declare var bootstrap: any;

@Component({
  selector: 'app-carta-renuencia-ap',
  templateUrl: './carta-renuencia-ap.component.html',
  styleUrls: ['./carta-renuencia-ap.component.css']
})
export class CartaRenuenciaApComponent {

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

    CartaRenuenciaAp!: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private docGenerator: DocgeneratorService,
    ) {}

    ngOnInit(): void {
        this.CartaRenuenciaAp = this.initForm();
        // Configurar el contenido personalizado para el tooltip

    }

    ngAfterViewInit(): void {
        // Inicializar los tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    onSubmit() {
        this.docGenerator.generateDocx(
            'http://localhost:4200/assets/formats/template-carta-renuencia-ap.docx',
            //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
            this.CartaRenuenciaAp.value,
            'carta-renuencia-acción-popular.docx');

        console.log('Formulario enviado', this.CartaRenuenciaAp.value);
    }

    initForm(): FormGroup {
      return this.fb.group({
        fecha: ['', Validators.required],
        ciudad: ['', Validators.required],
        nombreAutoridad: ['', Validators.required],
        entidadAutoridad: ['', Validators.required],
        ciudadAutoridad: ['', Validators.required],
        direccionAutoridad: ['', Validators.required],
        referencia: ['', Validators.required],
        solicitud: ['', Validators.required],
        hechos: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        nombreSolicitante: ['', Validators.required],
        tipoDocumento: ['', Validators.required],
        cedulaSolicitante: ['', Validators.required],
        cedulaExpedicion: ['', Validators.required],
        telefonoSolicitante: ['', Validators.required],
        correoSolicitante: ['', Validators.required],
        direccionSolicitante: ['', Validators.required],
      });
    }

    crearHechoFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required],
      });
    }

    agregarHecho() {
      const hechosArray = this.CartaRenuenciaAp.get('hechos') as FormArray;
      hechosArray.push(this.crearHechoFormGroup());
      console.log(this.CartaRenuenciaAp.controls);
    }

    eliminarHecho() {
      const hechosArray = this.CartaRenuenciaAp.get('hechos') as FormArray;
      if(hechosArray.length > 1){
      hechosArray.removeAt(hechosArray.length - 1);
      }
    }

    get hechos(): FormArray {
      return this.CartaRenuenciaAp.get('hechos') as FormArray;
    }


}
