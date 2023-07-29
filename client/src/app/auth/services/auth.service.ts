import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { TokenStorageService } from './token-storage.service';
import { Observable, Subject, filter, map, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';
  public gonnaLogIn$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService,
    private toastr: ToastrService
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

  verifyJwt(token: string) {
    return this.http.get<{ result: string; user: any }>(
      this.apiUrl + '/verify-jwt',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  forgotPassword(email: string) {
    const userData = { email };
    const emailConfig = {
      url: '/renewPassword?',
      subject: 'DSRC renew password link',
      content:
        'DSRC renew password link is attached AND VALID ONLY FOR 5 MINUTES, please click on it to renew your password',
    };
    const req = { userData, emailConfig };
    return this.http.post<{ token: string }>(
      this.apiUrl + '/forgot-password',
      req
    );
  }

  renewPassword(email: string, password: string) {
    return this.http.post(this.apiUrl + '/renew-password', {
      email,
      password,
    });
  }

  isLogin(): Observable<User> {
    const token = this.tokenService.getToken();
    if (token) {
      return this.verifyJwt(token).pipe(
        filter((res) => res !== undefined),
        map((res) => {
          if (!res?.user?.email) {
            return null;
          }
          return res.user;
        })
      );
    }

    return of(null);
  }

  logout() {
    this.gonnaLogIn$.next(false);
    this.tokenService.removeToken();
    this.toastr.show('Logout successful!');
    // TODO - navigate to home page
  }

  sendVerifyRegisterEmail(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const userData = { email, password, firstName, lastName };
    const emailConfig = {
      url: '/verifyRegister?',
      subject: 'DSRC register verification link',
      content:
        'DSRC register verification link is attached AND VALID ONLY FOR 5 MINUTES, to be registred at DSRC, you MUST click on the link',
    };
    const req = { userData, emailConfig };
    return this.http.post(this.apiUrl + '/sendVerifyRegisterEmail', req);
  }
}
