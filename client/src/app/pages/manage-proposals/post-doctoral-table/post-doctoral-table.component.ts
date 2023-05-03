import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Component({
  selector: 'app-post-doctoral-table',
  templateUrl: './post-doctoral-table.component.html',
  styleUrls: ['./post-doctoral-table.component.scss'],
})
export class PostDoctoralTableComponent implements OnInit {
  postDoctoralProposals$: Observable<GrantProposal[]>;

  constructor(private grantProposalsService: GrantProposalService) {}

  ngOnInit(): void {
    this.postDoctoralProposals$ =
      this.grantProposalsService.getProposalsByGrantType('POST_DOCTORAL');
  }
}
