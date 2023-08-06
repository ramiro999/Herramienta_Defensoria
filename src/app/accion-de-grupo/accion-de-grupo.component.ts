import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';

declare var bootstrap: any; 
@Component({
  selector: 'app-accion-de-grupo',
  templateUrl: './accion-de-grupo.component.html',
  styleUrls: ['./accion-de-grupo.component.css']
})
export class AccionDeGrupoComponent {

  AccionDeGrupo!: FormGroup;

  constructor(
    private readonly fb: FormBuilder, 
    private docGenerator: DocgeneratorService,
    ) {}

    ngOnInit(): void {
      this.AccionDeGrupo = this.initForm();
      // Configurar el contenido personalizado para el tooltip
    }

    ngAfterViewInit(): void {
      // Inicializar los tooltips
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }


    onSubmit() {
      this.docGenerator.generateDocx(
        'http://localhost:4200/assets/formats/template-accion-de-grupo.docx',
        //"https://drive.google.com/uc?id=1JMQiqx0ORMZsz57C4SSRNLoFnb8NmQ1_",
        this.AccionDeGrupo.value,
        'accion-de-grupo');
  
  
      console.log('Formulario enviado', this.AccionDeGrupo.value);
    }
  

    initForm(): FormGroup {
      return this.fb.group({
        dirigido: ['', Validators.required],
      });
    }


}
