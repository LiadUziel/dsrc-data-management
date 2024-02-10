import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = environment.apiUrl + '/api/file';

  constructor(private http: HttpClient) {}

  downloadFile(filePath: string): Observable<any> {
    const body = { filePath };
    return this.http.post(this.apiUrl + '/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-type', 'application/json'),
    });
  }
}
