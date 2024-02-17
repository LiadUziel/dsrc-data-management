import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = environment.apiUrl + '/api/file';

  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ fileName: string }>(
      this.apiUrl + '/upload',
      formData
    );
  }
}
