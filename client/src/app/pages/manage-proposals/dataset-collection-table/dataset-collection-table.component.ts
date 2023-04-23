import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Component({
  selector: 'app-dataset-collection-table',
  templateUrl: './dataset-collection-table.component.html',
  styleUrls: ['./dataset-collection-table.component.scss'],
})
export class DatasetCollectionTableComponent implements OnInit {
  dsCollectionProposals$: Observable<GrantProposal[]>;

  constructor(private grantProposalsService: GrantProposalService) {}

  ngOnInit(): void {
    this.dsCollectionProposals$ =
      this.grantProposalsService.getProposalsByGrantType('DATASET_COLLECTION');
  }
}
