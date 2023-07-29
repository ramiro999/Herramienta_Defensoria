import { Injectable } from '@angular/core';
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  getTemplate(){
    return fetch('http://localhost:4200/assets/template-test.docx', {
      method: 'GET', mode: 'no-cors'
  }).then((response) => {
      return response.blob();
  })
}

}
