import { Injectable } from '@angular/core';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url: any, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Injectable({
  providedIn: 'root'
})


export class DocgeneratorService {

  constructor() {

   }

  generateDocx(template: string, data: any, filename: string) {
    
    loadFile(template, function (error: any, content: any) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
      });

      doc.render(data)

      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, filename);

    });
  }

}
