import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;
@Component({
  selector: 'app-habeas-corpus',
  templateUrl: './habeas-corpus.component.html',
  styleUrls: ['./habeas-corpus.component.css']
})
export class HabeasCorpusComponent implements OnInit {

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


  HabeasCorpus!: FormGroup;
  selectedOption: 'privacion' | 'prolongacion' = 'privacion'; // Variable para mantener la opción seleccionada

  constructor(
    private readonly fb: FormBuilder,
    private docGenerator: DocgeneratorService,
  ) { }

  ngOnInit(): void {
    this.HabeasCorpus = this.initForm();
  }

  ngAfterViewInit(): void {
    // Inicializar los tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }


  initForm(): FormGroup {
    return this.fb.group({
      ciudad: ['', Validators.required],
      fecha: ['', Validators.required],
      juez: ['', Validators.required],
      ciudadJuez: ['', Validators.required],
      direccionJuez: ['', Validators.required],
      nombrePrivada: ['', Validators.required],
      nombrePeticionario: ['', Validators.required],
      calidad: ['', Validators.required],
      hechos: this.fb.array([this.crearHechoFormGroup()]),
      autoridad: ['', Validators.required],
      fechaAprehendido: ['', Validators.required],
      autoridadOrden: ['', Validators.required],
      dias: ['', Validators.required],
      sitioReclusion: ['', Validators.required],
      fechaReclusion: ['', Validators.required],
      funcionario: ['', Validators.required],
      cargoFuncionario: ['', Validators.required],
      nombreSolicitante: ['', Validators.required],
      direccionSolicitante: ['', Validators.required],
      telefonoSolicitante: ['', Validators.required],
      correoSolicitante: ['', Validators.required],
      cedulaSolicitante: ['', Validators.required],
      cedulaExpedicion: ['', Validators.required],
    });
  }

  onSubmit() {
    let templateURL: string;
    let docName: string;

    if (this.selectedOption === 'privacion') {
      templateURL = 'http://localhost:4200/assets/formats/template-habeas-corpus-1.docx';
      docName = 'habeas-corpus-privacion';
    } else {
      templateURL = 'http://localhost:4200/assets/formats/template-habeas-corpus-prolongacion.docx';
      docName = 'habeas-corpus-prolongacion';
    }

    this.docGenerator.generateDocx(templateURL, this.HabeasCorpus.value, docName);

    console.log('Formulario enviado', this.HabeasCorpus.value);
  }

  crearHechoFormGroup(): FormGroup {
    return this.fb.group({
      contenido: ['', Validators.required]
    });
  }

  agregarHecho() {
    const hechosArray = this.HabeasCorpus.get('hechos') as FormArray;
    hechosArray.push(this.crearHechoFormGroup());
    console.log(this.HabeasCorpus.controls)
  }

  eliminarHecho(){
    const hechosArray = this.HabeasCorpus.get('hechos') as FormArray;
    if(hechosArray.length > 1){
      hechosArray.removeAt(hechosArray.length - 1);
    }
  }

  get hechos(): FormArray {
    return this.HabeasCorpus.get('hechos') as FormArray;
  }



}

