import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { GrantProposal } from '../models/grant-proposal.interface';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { CustomFieldRaw } from '../models/new-field-raw.interface';
import { map } from 'rxjs';

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

  // get proposals of logged in user from api by email
  getUserProposal() {
    const { href } = new URL(`/api/grant-proposal/logged-user`, this.apiUrl);
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

  updateProposalStatus(
    id: string,
    status: 'PENDING' | 'PARTIALLY_APPROVED' | 'APPROVED' | 'REJECTED',
    amountGiven: number
  ) {
    const { href } = new URL(
      `/api/grant-proposal/update-status/${id}`,
      this.apiUrl
    );
    const token = this.tokenService.getToken();
    return this.http.patch<GrantProposal>(
      href,
      { status, amountGiven },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getDepartments() {
    const { href } = new URL('/api/grant-proposal/departments', this.apiUrl);

    const token = this.tokenService.getToken();
    return this.http
      .get<string[]>(href, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((departments) =>
          departments.map((department) => ({
            name: department,
          }))
        )
      );
  }

  getUniversities() {
    const { href } = new URL('/api/grant-proposal/universities', this.apiUrl);

    const token = this.tokenService.getToken();
    return this.http
      .get<string[]>(href, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((universities) =>
        universities.map((university) => ({
            name: university,
          }))
        )
      );
  }

  getReviewerProposals() {
    const { href } = new URL('/api/grant-proposal/reviewer', this.apiUrl);

    const token = this.tokenService.getToken();
    return this.http.get<GrantProposal[]>(href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getTeamMemberProposals() {
    const { href } = new URL('/api/grant-proposal/team-member', this.apiUrl);

    const token = this.tokenService.getToken();
    return this.http.get<GrantProposal[]>(href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  sendReview(proposalId: string, reviewText: string, writerEmail: string) {
    const { href } = new URL(
      `/api/grant-proposal/review/${proposalId}`,
      this.apiUrl
    );

    const token = this.tokenService.getToken();
    return this.http.patch<GrantProposal>(
      href,
      { reviewText, writerEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
