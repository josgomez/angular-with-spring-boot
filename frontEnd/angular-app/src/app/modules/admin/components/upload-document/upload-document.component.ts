import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { UploadDocumentService } from 'src/app/services/upload-document.service';


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {

  constructor(private uploadDocumentService: UploadDocumentService) { }


  uploadFileForm = new FormGroup({
    documentInfo: new FormControl(''),
    documentFile: new FormControl(''), 
  });

  ngOnInit(): void {
  
  }



  uploadedImage!: File;
  dbDocument: any;
  postResponse: any;
  successResponse!: string;
  //image: string = 'prueba';



  public onImageUpload(event: any): void {
    this.uploadedImage = event.target.files[0];
  }


  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('document', this.uploadedImage, this.uploadedImage.name);

    this.uploadDocumentService.uploadDocument(imageFormData).subscribe({
      next: data => {
        this.successResponse = data;
      },
      error: error => {
        this.successResponse = error;
        throwError(() => new Error(error))
      },
      complete: () => {  
        console.log('Files uploaded successfully'); 
      } 
    })

  }

  viewDocument() {  
    this.uploadDocumentService.viewImageInfo(this.uploadFileForm.get('documentInfo')?.value).subscribe({
      next: data => {
        this.postResponse = data;
      },
      error: error => {
        this.successResponse = error;
        throwError(() => new Error(error))
      },
      complete: () => {  
        console.log('File Info');
        let document = this.uploadDocumentService.base64ToArrayBuffer(this.postResponse.document);
        this.uploadDocumentService.getFile(document, this.postResponse.type);
        this.dbDocument = 'data:image/jpeg;base64,' + this.postResponse.document;
      } 
    })
  }

  renderDocument() {
    this.uploadDocumentService.getDocument(this.uploadFileForm.get('documentFile')?.value).subscribe({
      next: data => {
        this.postResponse = data;       
      },
      error: error => {
        this.successResponse = error;
        throwError(() => new Error(error))
      },
      complete: () => {  
        console.log('File showed');
        this.uploadDocumentService.getFile(this.postResponse, 'image/jpeg');
      } 
    })
  }

  getDocument(){

    //let newWindow = window.open('', '_blank');
    // newWindow!.location.href = 'http://localhost:8080/josky-app/api/get/document/pruebaCarga.pdf';
    // newWindow?.blur;
    // newWindow?.focus;  

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status == 200) { 
              
        let newWindow = window.open('', '_blank', 'left=200,top=100,width=650,height=550,fullscreen=no');
        let div = newWindow?.document.createElement('div');
        div?.setAttribute('id', 'divIFrame');
        div!.setAttribute('width', '100%');  
        div!.setAttribute('height', '100%');
        newWindow?.document.body.appendChild(div!);        

        /*SHOW IMAGE*/
        // let blob = new Blob([xhr.response], { type: 'image/jpeg' });
        // let url = window.URL.createObjectURL(blob);
        // let myImage = new Image();
        // myImage!.setAttribute('src', url);
        // myImage.style.display='block';
        // myImage.style.marginLeft='auto';
        // myImage.style.marginRight='auto'      
        // newWindow?.document.getElementById('divIFrame')?.appendChild(myImage);
        /*SHOW IMAGE*/

        /*SHOW PDF*/
        let blob = new Blob([xhr.response], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(blob);
        let iframe = document.createElement('iframe');
        iframe!.setAttribute('src', url);
        iframe!.setAttribute('width', '100%');  
        iframe!.setAttribute('height', '100%');         
        newWindow?.document.getElementById('divIFrame')?.appendChild(iframe);
        /*SHOW PDF*/
        
        newWindow?.blur;
        newWindow?.focus; 
        
      }
    }
    /*SHOW IMAGE*/
    // xhr.open('GET', 'http://localhost:8080/josky-app/api/get/document/' + 'auto2.PNG', true);
    // xhr.setRequestHeader('Content-type', 'image/jpeg');
    /*SHOW IMAGE*/

     /*SHOW PDF*/
    xhr.open('GET', 'http://localhost:8080/josky-app/api/get/document/' + 'pruebaCarga.pdf', true);    
    xhr.setRequestHeader('Content-type', 'application/pdf');
    /*SHOW PDF*/

    xhr.responseType='arraybuffer';      
    xhr.send();
    
    
  }

}
