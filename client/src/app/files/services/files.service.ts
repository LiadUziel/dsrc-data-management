import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = environment.apiUrl + '/api/file';
  constructor(private http: HttpClient) { }

  uploadFile(file) {
    return this.http.post(this.apiUrl + '/upload', file);
  }
}
