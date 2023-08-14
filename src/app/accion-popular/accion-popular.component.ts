import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-accion-popular',
  templateUrl: './accion-popular.component.html',
  styleUrls: ['./accion-popular.component.css']
})
export class AccionPopularComponent {

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

  AccionPopular!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private docGenerator: DocgeneratorService,
  ) { }

  ngOnInit(): void {
    this.AccionPopular = this.initForm();
    // Configurar el contenido personalizado para el tooltip
  }

  ngAfterViewInit(): void {
    // Inicializar los tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  onSubmit() {
    this.docGenerator.generateDocx(
      'http://localhost:4200/assets/formats/template-accion-popular.docx',
      this.AccionPopular.value,
      'accion-popular');
    
      console.log('Formulario enviado', this.AccionPopular.value);
    }

    initForm() {
      return this.fb.group({
        ciudad: ['', Validators.required],
        fecha: ['', Validators.required],
        juez: ['', Validators.required],
        ciudadJuez: ['', Validators.required],
        nombreDemandante: ['', Validators.required],
        ciudadResidencia: ['', Validators.required],
        tipoDocumento: ['', Validators.required],
        cedulaDemandante: ['', Validators.required],
        ciudadCedula: ['', Validators.required],
        nombreDemandado: ['', Validators.required],
        correoDemandado: ['', Validators.required],
        direccionDemandado: ['', Validators.required],
        hechos: this.fb.array([this.crearHechoFormGroup()]),
        derechosVulnerados: this.fb.array([this.crearHechoFormGroup()]),
        pretension: ['', Validators.required],
        pruebas: this.fb.array([this.crearHechoFormGroup()]),
        telefonoDemandante: ['', Validators.required],
        correoDemandante: ['', Validators.required],
        direccionDemandante: ['', Validators.required],
        
      });
    }

    crearHechoFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required],
      });
    }

    agregarHecho() {
      const hechosArray = this.AccionPopular.get('hechos') as FormArray;
      hechosArray.push(this.crearHechoFormGroup());
      console.log(this.AccionPopular.controls);
    }

    agregarDerechoVulnerado() {
      const derechosVulneradosArray = this.AccionPopular.get('derechosVulnerados') as FormArray;
      derechosVulneradosArray.push(this.crearHechoFormGroup());
      console.log(this.AccionPopular.controls);
    };

    agregarPrueba() {
      const pruebasArray = this.AccionPopular.get('pruebas') as FormArray;
      pruebasArray.push(this.crearHechoFormGroup());
      console.log(this.AccionPopular.controls);
    };

    eliminarHecho(){
      const hechosArray = this.AccionPopular.get('hechos') as FormArray;
      if(hechosArray.length > 1){
        hechosArray.removeAt(hechosArray.length - 1);
      }
    }

    eliminarDerechoVulnerado(){
      const derechosVulneradosArray = this.AccionPopular.get('derechosVulnerados') as FormArray;
      if(derechosVulneradosArray.length > 1){
        derechosVulneradosArray.removeAt(derechosVulneradosArray.length - 1);
      }
    }

    eliminarPrueba(){
      const pruebasArray = this.AccionPopular.get('pruebas') as FormArray;
      if(pruebasArray.length > 1){
        pruebasArray.removeAt(pruebasArray.length - 1);
      }
    }

    get hechos(): FormArray {
      return this.AccionPopular.get('hechos') as FormArray;
    }

    get derechosVulnerados(): FormArray {
      return this.AccionPopular.get('derechosVulnerados') as FormArray;
    }

    get pruebas(): FormArray {
      return this.AccionPopular.get('pruebas') as FormArray;
    }



}
