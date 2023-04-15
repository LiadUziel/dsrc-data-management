import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<{ token: string }>(this.apiUrl + '/login', {
      email,
      password,
      rememberMe,
    });
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return this.http.post(this.apiUrl + '/signup', {
      email,
      password,
      firstName,
      lastName,
    });
  }

  // TODO - remove this - just dummy
  protected() {
    const token = this.tokenService.getToken();
    return this.http.get<{ result: string }>(this.apiUrl + '/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  protectedAdmin() {
    const token = this.tokenService.getToken();
    return this.http.get<{ result: string }>(this.apiUrl + '/protected-admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
