import { HttpHeaders } from "@angular/common/http";

const serverUrl = 'http://localhost:8080/josky-app/api';

export const api_users = {
    login: serverUrl.concat("/login-user"),
    saveUser: serverUrl.concat("/save-user"),
    getData: serverUrl.concat("/getdata"),
    uploadDocument: serverUrl.concat("/upload/document"),
    getDocumentInfo: serverUrl.concat("/get/document/info/"),
    getDocument: serverUrl.concat("/get/document/")
}

export const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin':  '*',        
      })
}