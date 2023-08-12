import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any; 
@Component({
  selector: 'app-accion-de-tutela',
  templateUrl: './accion-de-tutela.component.html',
  styleUrls: ['./accion-de-tutela.component.css']
})

export class AccionDeTutelaComponent {

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


  AccionDeTutela!: FormGroup;

  constructor(
    private readonly fb: FormBuilder, 
    private docGenerator: DocgeneratorService,
    ) {}

    ngOnInit(): void {
      this.AccionDeTutela = this.initForm();
      // Configurar el contenido personalizado para el tooltip
    }

    ngAfterViewInit(): void {
      // Inicializar los tooltips
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
      }

      onSubmit() {
        this.docGenerator.generateDocx(
          'http://localhost:4200/assets/formats/template-accion-de-tutela.docx',
          this.AccionDeTutela.value,
          'accion-de-tutlea');
    
    
        console.log('Formulario enviado', this.AccionDeTutela.value);
      }
      

      initForm(): FormGroup {
        return this.fb.group({
          ciudad: ['', Validators.required],
          fecha: ['', Validators.required],
          juez: ['', Validators.required],
          ciudadJuez: ['', Validators.required],
          nombreDemandante: ['', Validators.required],
          nombreDemandandado: ['', Validators.required],
          tipoDocumento: ['', Validators.required],
          cedulaDemandante: ['', Validators.required],
          ciudadCedula: ['', Validators.required],
          direccionDemandado: ['', Validators.required],
          correoDemandado: ['', Validators.required],
          derechosFundamentales: ['', Validators.required],
          hechos: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
          derechosVulnerados : this.fb.array( [ this.fb.group({contenido: ''}) ] ),
          fundamentosJuridicos: [''],
          pruebas: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
          pretensiones: ['', Validators.required],
          direccionDemandante: ['', Validators.required],
          correoDemandante: ['', Validators.required],
        });
      }


      crearHechoFormGroup(): FormGroup {
        return this.fb.group({
          contenido: ['', Validators.required]
        });
      }

      crearDerechoFormGroup(): FormGroup {
        return this.fb.group({
          contenido: ['', Validators.required]
        });
      }
   
      crearPruebaFormGroup(): FormGroup {
        return this.fb.group({
          contenido: ['', Validators.required]
        });
      }

      agregarHecho() {
        const hechosArray = this.AccionDeTutela.get('hechos') as FormArray;
        hechosArray.push(this.crearHechoFormGroup());
        console.log(this.AccionDeTutela.controls)
      };

      agregarDerechoVulnerado() {
        const derechosVulneradosArray = this.AccionDeTutela.get('derechosVulnerados') as FormArray;
        derechosVulneradosArray.push(this.crearDerechoFormGroup());
        console.log(this.AccionDeTutela.controls)
      };
   
      agregarPrueba() {
        const pruebasArray = this.AccionDeTutela.get('pruebas') as FormArray;
        pruebasArray.push(this.crearPruebaFormGroup());
        console.log(this.AccionDeTutela.controls)
      };


      eliminarHecho() {
        const hechosArray = this.AccionDeTutela.get('hechos') as FormArray;
        if (hechosArray.length > 1) {
          hechosArray.removeAt(hechosArray.length - 1);
        }
      }

      eliminarDerechoVulnerado() {
        const derechosVulneradosArray = this.AccionDeTutela.get('derechosVulnerados') as FormArray;
        if (derechosVulneradosArray.length > 1) {
          derechosVulneradosArray.removeAt(derechosVulneradosArray.length - 1);
        }
      }

      eliminarPrueba() {
        const pruebasArray = this.AccionDeTutela.get('pruebas') as FormArray;
        if (pruebasArray.length > 1) {
          pruebasArray.removeAt(pruebasArray.length - 1);
        }
      }
    
      get hechos(): FormArray {
        return this.AccionDeTutela.get('hechos') as FormArray;
      }

      get derechosVulnerados(): FormArray {
        return this.AccionDeTutela.get('derechosVulnerados') as FormArray;
      }

      get pruebas(): FormArray {
          return this.AccionDeTutela.get('pruebas') as FormArray;
      }





}
