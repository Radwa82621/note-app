import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  userToken!: any;
  secretKey!: string;
  constructor(private _HttpClient: HttpClient) {
    this.userToken = localStorage.getItem('userToken');
    this.secretKey = '3b8ny__' + this.userToken;
  }

  addNote(form: any): Observable<any> {
    const headers = new HttpHeaders({
      token: this.secretKey,
    });
    const requestOptions = { headers: headers };
    return this._HttpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      form,
      requestOptions
    );
  }
  UpdateNote(form: any, dataForm: any): Observable<any> {
    console.log(form, dataForm);

    const headers = new HttpHeaders({
      token: this.secretKey,
    });
    const requestOptions = { headers: headers };
    return this._HttpClient.put(
      `https://note-sigma-black.vercel.app/api/v1/notes/${form.note._id}`,
      dataForm,
      requestOptions
    );
  }
  getNotes(): Observable<any> {
    return this._HttpClient.get(
      `https://note-sigma-black.vercel.app/api/v1/notes/allNotes`
    );
  }

  deleteNote(id: string): Observable<any> {
    const headers = new HttpHeaders({
      token: this.secretKey,
    });
    const requestOptions = { headers: headers };
    return this._HttpClient.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      requestOptions
    );
  }
}
