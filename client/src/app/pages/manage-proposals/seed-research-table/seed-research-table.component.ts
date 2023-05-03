import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Component({
  selector: 'app-seed-research-table',
  templateUrl: './seed-research-table.component.html',
  styleUrls: ['./seed-research-table.component.scss'],
})
export class SeedResearchTableComponent implements OnInit {
  seedResearchProposals$: Observable<GrantProposal[]>;

  constructor(private grantProposalsService: GrantProposalService) {}

  ngOnInit(): void {
    this.seedResearchProposals$ =
      this.grantProposalsService.getProposalsByGrantType('SEED_RESEARCH');
  }
}
