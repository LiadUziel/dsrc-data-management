import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { GrantProposal } from '../models/grant-proposal.interface';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { CustomFieldRaw } from '../models/new-field-raw.interface';

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

  getAllProposals() {
    const { href } = new URL(`/api/grant-proposal`, this.apiUrl);
    const token = this.tokenService.getToken();
    return this.http.get<GrantProposal[]>(href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // get proposal from api by DS_DOCTORAL, POST_DOCTORAL, SEED_RESEARCH, or DATASET_COLLECTION
  getProposalsByGrantType(
    grantType:
      | 'DS_DOCTORAL'
      | 'POST_DOCTORAL'
      | 'SEED_RESEARCH'
      | 'DATASET_COLLECTION'
  ) {
    const { href } = new URL(`/api/grant-proposal/${grantType}`, this.apiUrl);
    const token = this.tokenService.getToken();
    return this.http.get<GrantProposal[]>(href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   *
   * @param proposal proposal to update
   * @param fields new fields to add to proposal
   * @returns updated proposal with new fields
   */
  updateCustomFields(proposal: GrantProposal, fields: CustomFieldRaw[]) {
    const { href } = new URL(
      `/api/grant-proposal/add-fields/${proposal._id}`,
      this.apiUrl
    );
    const token = this.tokenService.getToken();
    return this.http.patch<GrantProposal>(
      href,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
