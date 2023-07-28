import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accion-de-cumplimiento',
  templateUrl: './accion-de-cumplimiento.component.html',
  styleUrls: ['./accion-de-cumplimiento.component.css']
})
export class AccionDeCumplimientoComponent {

  AccionDeCumplimiento!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Formulario enviado');
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
    
    });
  }


}
