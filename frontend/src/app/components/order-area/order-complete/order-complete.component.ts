import { Component, ElementRef, ViewChild } from '@angular/core';
// import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;

  // public async generatePDF() {
  //   const doc = new jspdf();
  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   await doc.fromHTML(document.getElementById('my-html-component'), 15, 15, {
  //     'width': 170,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('example.pdf');
  // }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('receipt.pdf');
    })
  }

}


