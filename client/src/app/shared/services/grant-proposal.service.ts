import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { GrantProposal } from '../models/grant-proposal.interface';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GrantProposalService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  createGrantProposal(grantProposal: GrantProposal) {
    const { href } = new URL('/api/grant-proposal', this.apiUrl);
    const token = this.tokenService.getToken();
    return this.http.post<GrantProposal>(href, grantProposal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
