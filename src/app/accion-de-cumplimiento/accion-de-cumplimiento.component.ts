import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { RequestService } from '../services/request.service';

import { DocgeneratorService } from '../services/docgenerator.service';

@Component({
  selector: 'app-accion-de-cumplimiento',
  templateUrl: './accion-de-cumplimiento.component.html',
  styleUrls: ['./accion-de-cumplimiento.component.css']
})
export class AccionDeCumplimientoComponent {

  AccionDeCumplimiento!: FormGroup;

  constructor(private readonly fb: FormBuilder, private docGenerator: DocgeneratorService) { }

  ngOnInit(): void {
    this.AccionDeCumplimiento = this.initForm();

  }

  onSubmit() {
    this.docGenerator.generateDocx(
      'http://localhost:4200/assets/template-test.docx',
      //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
      this.AccionDeCumplimiento.value,
      'accion-de-cumplimiento');


    console.log('Formulario enviado', this.AccionDeCumplimiento.value);
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: [''],
      email: [''],
      message: ['']
    
    });
  }

  // https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_



}
