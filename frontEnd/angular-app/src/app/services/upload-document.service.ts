import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { api_users } from '../static/paths-api';

@Injectable({
  providedIn: 'root',
})
export class UploadDocumentService {
  constructor(private router: Router, private http: HttpClient) {}

  contentType: string ='';

  uploadDocument(formDocuments: FormData): Observable<any> {
    return this.http.post(api_users.uploadDocument, formDocuments);
  }

  viewImageInfo(image: any): Observable<any> {
    return this.http.get(api_users.getDocumentInfo + image);
  }

  getDocument(image: any): Observable<any> {
    return this.http.get(api_users.getDocument + image, {
      responseType: 'arraybuffer',
    });
  }

  viewDocument(document: any) {
    return this.http.get(api_users.getDocumentInfo + document);
  }

  getFile(data: any, type: string) {    
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url,'_blank');
  
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }    
    window.URL.revokeObjectURL(url);
  }

  base64ToArrayBuffer(base64: any) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

}
