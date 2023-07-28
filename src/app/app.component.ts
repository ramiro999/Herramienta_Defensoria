import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formulario-pdf';
  myImage:string = "assets/images/Fondo.png";
  onMenuButtonClick(): void {
    // Aquí puedes realizar la acción que deseas cuando se hace clic en el botón
    console.log('Se hizo clic en el botón de la navbar.');
    // Por ejemplo, podrías abrir/cerrar un menú desplegable o navegar a otra página, etc.
  }
}

