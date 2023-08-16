import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-habeas-corpus-p',
  templateUrl: './habeas-corpus-p.component.html',
  styleUrls: ['./habeas-corpus-p.component.css'],
})
export class HabeasCorpusPComponent {
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

  HabeasCorpusP!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private docGenerator: DocgeneratorService
  ) {}

  ngOnInit(): void {
    this.HabeasCorpusP = this.initForm();
  }

  ngAfterViewInit(): void {
    // Inicializar los tooltips
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = Array.from(tooltipTriggerList).map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }
  initForm(): FormGroup {
    return this.fb.group({
      ciudad_2: ['', Validators.required],
      fecha_2: ['', Validators.required],
      juez_2: ['', Validators.required],
      ciudadJuez_2: ['', Validators.required],
      direccionJuez_2: ['', Validators.required],
      nombrePrivada_2: ['', Validators.required],
      nombrePeticionario_2: ['', Validators.required],
      calidad_2: ['', Validators.required],
      hechos: this.fb.array([this.crearHechoFormGroup()]),
      sitioReclusion_2: ['', Validators.required],
      dias_2: ['', Validators.required],
      fechaReclusion_2: ['', Validators.required],
      nombreSolicitante_2: ['', Validators.required],
      cedulaSolicitante_2: ['', Validators.required],
      cedulaExpedicion_2: ['', Validators.required],
      direccionSolicitante_2: ['', Validators.required],
      telefonoSolicitante_2: ['', Validators.required],
      correoSolicitante_2: ['', Validators.required],
    });
  }

  onSubmit() {
    this.docGenerator.generateDocx(
      'assets/formats/template-habeas-corpus-2.docx',
      //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
      this.HabeasCorpusP.value,
      'habeas-corpus-prolongación.docx'
    );

    console.log('Formulario enviado', this.HabeasCorpusP.value);
  }

  crearHechoFormGroup(): FormGroup {
    return this.fb.group({
      contenido: ['', Validators.required],
    });
  }

  agregarHecho() {
    const hechosArray = this.HabeasCorpusP.get('hechos') as FormArray;
    hechosArray.push(this.crearHechoFormGroup());
    console.log(this.HabeasCorpusP.controls);
  }

  eliminarHecho() {
    const hechosArray = this.HabeasCorpusP.get('hechos') as FormArray;
    if (hechosArray.length > 1) {
      hechosArray.removeAt(hechosArray.length - 1);
    }
  }

  get hechos(): FormArray {
    return this.HabeasCorpusP.get('hechos') as FormArray;
  }
}
