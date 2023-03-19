import { Component, ElementRef, ViewChild } from '@angular/core';
import {htmlToText} from 'html-to-text';
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

  // convertHtmlToText() {
  //   let DATA: any = document.getElementById('htmlData');
  //   const text = htmlToText(`DATA`);
  //   const file = new Blob([text], {type: 'text/plain'});
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = window.URL.createObjectURL(file);
  //   downloadLink.download = 'receipt.txt';
  //   downloadLink.click();
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


