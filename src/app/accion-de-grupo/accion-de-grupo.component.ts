import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { DocgeneratorService } from '../services/docgenerator.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

declare var bootstrap: any; 
@Component({
  selector: 'app-accion-de-grupo',
  templateUrl: './accion-de-grupo.component.html',
  styleUrls: ['./accion-de-grupo.component.css']
})
export class AccionDeGrupoComponent {

  model: string | null = null; // Para almacenar la fecha seleccionada

  toggleDatepicker() {
    const dateInput = document.getElementById('caducidad') as HTMLInputElement;
    if (dateInput) {
      dateInput.click(); // Abre el datepicker
    }
  }

  onDateChange(event: Event) {
    const dateInput = event.target as HTMLInputElement;
    this.model = dateInput.value; // Almacena la fecha seleccionada en la variable 'model'
  }

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

      if (this.AccionDeGrupo.value.legalmenteConstituido == "entidad publica") {

        this.AccionDeGrupo.patchValue({
          competencia: "Es usted señor juez el competente para tramitar la presente acción de grupo, teniendo en cuenta que dentro de los demandados se encuentra una autoridad pública."
        });


      }else if (this.AccionDeGrupo.value.legalmenteConstituido == "persona juridica") {

        this.AccionDeGrupo.patchValue({
          competencia: "Es usted señor juez el competente para tramitar la presente acción de grupo, teniendo en cuenta que el demandado es una jurídica."
        });

      

      }else if (this.AccionDeGrupo.value.legalmenteConstituido == "persona natural") {

        this.AccionDeGrupo.patchValue({
          competencia: "Es usted señor juez el competente para tramitar la presente acción de grupo, teniendo en cuenta que el demandado es una persona natural."
        });
      }


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
        ciudad: ['', Validators.required],
        nombreDemandado: ['', Validators.required],
        legalmenteConstituido: ['', Validators.required],
        competencia: [''],
        razonDemanda: ['', Validators.required],
        nombreDemandante: ['', Validators.required],
        nombreAbogado: ['', Validators.required],
        ciudadAbogado: ['', Validators.required],
        cedulaAbogado: ['', Validators.required],
        ciudadExpedicionAbogado: ['', Validators.required],
        tarjetaProfesional: ['', Validators.required],
        demandantes: this.fb.array( [ this.fb.group({nombre: '', cedula: ''}) ] ),
        fecha: new Date().toLocaleDateString('es-CO',{
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        hechos: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        pretension: ['', Validators.required],
        valorPretension: ['', Validators.required],
        perjuicios: ['', Validators.required],
        criterios: ['', Validators.required],
        idefAccionada: ['', Validators.required],
        caducidad: ['', Validators.required],
        procedencia: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        documentales: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        documentalesSOLI: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        periciales: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        testimoniales: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        domicilioDemandado: ['', Validators.required],
        ciudadDemandado: ['', Validators.required],
        domicilioDemandante: ['', Validators.required],
        ciudadDemandante: ['', Validators.required],
        abogadoSuscrito: ['', Validators.required],
      });
    }

    crearDemandanteFormGroup(): FormGroup {
      return this.fb.group({
        nombre: ['', Validators.required],
        cedula: ['', Validators.required],
      });
    }

    crearHechoFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required]
      });
    }

    crearProcedenciaFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required]
      });
    }

    crearDocumentalFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required]
      });
    }


    crearDocumentalSOLIFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required]
      });
    }

    crearPericialFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required]
      });
    }

    crearTestimonialFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['', Validators.required]
      });
    }




    agregarDemandante() {
      const demandantesArray = this.AccionDeGrupo.get('demandantes') as FormArray;
      demandantesArray.push(this.crearDemandanteFormGroup());
      console.log(this.AccionDeGrupo.controls)
    }

    agregarHecho() {
      const hechosArray = this.AccionDeGrupo.get('hechos') as FormArray;
      hechosArray.push(this.crearHechoFormGroup());
      console.log(this.AccionDeGrupo.controls)
    }

    agregarProcedencia() {
      const procedenciaArray = this.AccionDeGrupo.get('procedencia') as FormArray;
      procedenciaArray.push(this.crearProcedenciaFormGroup());
      console.log(this.AccionDeGrupo.value)
    }

    agregarDocumental() {
      const documentalArray = this.AccionDeGrupo.get('documentales') as FormArray;
      documentalArray.push(this.crearDocumentalFormGroup());
      console.log(this.AccionDeGrupo.value)
    }

    agregarDocumentalSOLI() {
      const documentalSOLIArray = this.AccionDeGrupo.get('documentalesSOLI') as FormArray;
      documentalSOLIArray.push(this.crearDocumentalSOLIFormGroup());
      console.log(this.AccionDeGrupo.value)
    }

    agregarPericial() {
      const pericialArray = this.AccionDeGrupo.get('periciales') as FormArray;
      pericialArray.push(this.crearPericialFormGroup());
      console.log(this.AccionDeGrupo.value)
    }

    agregarTestimonial() {
      const testimonialArray = this.AccionDeGrupo.get('testimoniales') as FormArray;
      testimonialArray.push(this.crearTestimonialFormGroup());
      console.log(this.AccionDeGrupo.value)
    }




    get demandantes(): FormArray {
      return this.AccionDeGrupo.get('demandantes') as FormArray;
    }

    get hechos(): FormArray {
      return this.AccionDeGrupo.get('hechos') as FormArray;
    }

    get procedencia(): FormArray {
      return this.AccionDeGrupo.get('procedencia') as FormArray;
    }

    get documentales(): FormArray {
      return this.AccionDeGrupo.get('documentales') as FormArray;
    }

    get documentalesSOLI(): FormArray {
      return this.AccionDeGrupo.get('documentalesSOLI') as FormArray;
    }

    get periciales(): FormArray {
      return this.AccionDeGrupo.get('periciales') as FormArray;
    }

    get testimoniales(): FormArray {
      return this.AccionDeGrupo.get('testimoniales') as FormArray;
    }






}
