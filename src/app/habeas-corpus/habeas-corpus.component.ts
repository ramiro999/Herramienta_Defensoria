import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';

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

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      motivoDetencion: ['', Validators.required],
      descripcionDetencion: ['', Validators.required],
      ubicacionDetencion: ['', Validators.required],
    });
  }

  onSubmit() {
    let templateURL: string;
    let docName: string;

    if (this.selectedOption === 'privacion') {
      templateURL = 'http://localhost:4200/assets/formats/template-habeas-corpus-privacion.docx';
      docName = 'habeas-corpus-privacion';
    } else {
      templateURL = 'http://localhost:4200/assets/formats/template-habeas-corpus-prolongacion.docx';
      docName = 'habeas-corpus-prolongacion';
    }

    this.docGenerator.generateDocx(templateURL, this.HabeasCorpus.value, docName);

    console.log('Formulario enviado', this.HabeasCorpus.value);
  }
}

