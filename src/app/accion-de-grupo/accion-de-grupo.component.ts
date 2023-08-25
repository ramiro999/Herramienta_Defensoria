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

      if (this.AccionDeGrupo.value.competencia_1 == "Persona natural") {

        this.AccionDeGrupo.patchValue({
          competencia_1: "Es usted señor juez el competente para tramitar la presente acción de grupo, teniendo en cuenta que el demandado es una (persona natural o jurídica) particular."
        });


      }else if (this.AccionDeGrupo.value.competencia_1 == "Autoridad") {

        this.AccionDeGrupo.patchValue({
          competencia_1: "Es usted señor juez el competente para tramitar la presente acción de grupo, teniendo en cuenta que dentro de los demandados se encuentra una autoridad pública."
        });

      }


      //documentalesSOLI
      if (this.AccionDeGrupo.value.documentalesSOLI[0].contenido == "") {
          
        this.AccionDeGrupo.patchValue({
          hasdocumentalesSOLI: false
        });
      }
      else {
        this.AccionDeGrupo.patchValue({
          hasdocumentalesSOLI: true
        });
      }

      //periciales
      if (this.AccionDeGrupo.value.periciales[0].contenido == "") {
          
        this.AccionDeGrupo.patchValue({
          haspericiales: false
        });
      }
      else {
        this.AccionDeGrupo.patchValue({
          haspericiales: true
        });
      }

      //testimoniales
      if (this.AccionDeGrupo.value.testimoniales[0].contenido == "") {
          
        this.AccionDeGrupo.patchValue({
          hastestimoniales: false
        });
      }
      else {
        this.AccionDeGrupo.patchValue({
          hastestimoniales: true
        });
      }
    

      // const docData = { ...this.AccionDeGrupo.value }; // Clonar los datos del formulario

  // Eliminar campos opcionales vacíos del objeto docData
 // if (!docData.documentalesSOLI.some((item: any) => item.contenido)) {
   // delete docData.documentalesSOLI;
  //}

//  if (!docData.periciales.some((item: any) => item.contenido)) {
 //   delete docData.periciales;
  //}

  //if (!docData.testimoniales.some((item: any) => item.contenido)) {
   // delete docData.testimoniales;
 // }

  // Generar el documento Word con docData
  this.docGenerator.generateDocx(
    'http://localhost:4200/assets/formats/template-accion-de-grupo.docx',
    this.AccionDeGrupo.value,
    'accion-de-grupo'
  );

  console.log('Formulario enviado', this.AccionDeGrupo.value);
}

  

    initForm(): FormGroup {
      return this.fb.group({
        dirigido: ['', Validators.required],
        ciudad: ['', Validators.required],
        entidadDemandada: ['', Validators.required],
        representanteEntidad: ['', Validators.required],
        competencia_1: ['', Validators.required],
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
        pretension_1: ['', Validators.required],
        pretension_2: ['', Validators.required],
        valorPretension: ['', Validators.required],
        perjuicios: ['', Validators.required],
        criterios: ['', Validators.required],
        idefAccionada: ['', Validators.required],
        caducidad: ['', Validators.required],
        procedencia: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        documentales: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        documentalesSOLI: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        hasdocumentalesSOLI: [''],
        periciales: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        haspericiales: [''],
        testimoniales: this.fb.array( [ this.fb.group({contenido: ''}) ] ),
        hastestimoniales: [''],
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
        contenido: ['']
      });
    }

    crearPericialFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['']
      });
    }

    crearTestimonialFormGroup(): FormGroup {
      return this.fb.group({
        contenido: ['']
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

    eliminarDemandante() {
      const demandantesArray = this.AccionDeGrupo.get('demandantes') as FormArray;
      if (demandantesArray.length > 1) {
        demandantesArray.removeAt(demandantesArray.length - 1);
      }
    }

    eliminarHecho() {
      const hechosArray = this.AccionDeGrupo.get('hechos') as FormArray;
      if (hechosArray.length > 1) {
        hechosArray.removeAt(hechosArray.length - 1);
      }
    }

    eliminarProcedencia() {
      const procedenciaArray = this.AccionDeGrupo.get('procedencia') as FormArray;
      if (procedenciaArray.length > 1) {
        procedenciaArray.removeAt(procedenciaArray.length - 1);
      }
    }

    eliminarDocumental() {
      const documentalArray = this.AccionDeGrupo.get('documentales') as FormArray;
      if (documentalArray.length > 1) {
        documentalArray.removeAt(documentalArray.length - 1);
      }
    }

    eliminarDocumentalSOLI() {
      const documentalSOLIArray = this.AccionDeGrupo.get('documentalesSOLI') as FormArray;
      if (documentalSOLIArray.length > 1) {
        documentalSOLIArray.removeAt(documentalSOLIArray.length - 1);
      }
    }

    eliminarPericial() {
      const pericialArray = this.AccionDeGrupo.get('periciales') as FormArray;
      if (pericialArray.length > 1) {
        pericialArray.removeAt(pericialArray.length - 1);
      }
    }

    eliminarTestimonial() {
      const testimonialArray = this.AccionDeGrupo.get('testimoniales') as FormArray;
      if (testimonialArray.length > 1) {
        testimonialArray.removeAt(testimonialArray.length - 1);
      }
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
