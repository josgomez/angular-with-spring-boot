import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { UploadDocumentService } from 'src/app/services/upload-document.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand!: any;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad!: any;

  constructor(private uploadDocumentService: UploadDocumentService) { }

  pdfSource: any;

  form = new FormGroup({
    documentFile: new FormControl(''),
  });


  ngOnInit(): void {
  }

  renderDocument() {
    this.uploadDocumentService.getDocument(this.form.get('documentFile')?.value).subscribe({
      next: data => {
        this.pdfSource =  new Uint8Array(data);           
      },
      error: error => {        
        throwError(() => new Error(error))
      },
      complete: () => {  
        console.log('File showed');        
      } 
    })
  }

  public openPdf() {
    this.uploadDocumentService.getDocument(this.form.get('documentFile')?.value).subscribe({
      next: data => {
        this.pdfSource =  new Blob([new Uint8Array(data)]); 
        // this.pdfViewerOnDemand.pdfSrc = this.pdfSource; // pdfSrc can be Blob or Uint8Array
        // this.pdfViewerOnDemand.refresh(); // Ask pdf viewer to load/reresh pdf          
      },
      error: error => {        
        throwError(() => new Error(error))
      },
      complete: () => {  
        console.log('File showed');        
      } 
    })
  
  }

}
