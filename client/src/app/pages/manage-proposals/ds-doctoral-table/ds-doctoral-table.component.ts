import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Component({
  selector: 'app-ds-doctoral-table',
  templateUrl: './ds-doctoral-table.component.html',
  styleUrls: ['./ds-doctoral-table.component.scss'],
})
export class DsDoctoralTableComponent implements OnInit {
  doctoralProposals$: Observable<GrantProposal[]>;

  constructor(private grantProposalsService: GrantProposalService) {}

  ngOnInit(): void {
    this.doctoralProposals$ =
      this.grantProposalsService.getProposalsByGrantType('DS_DOCTORAL');
  }
}
