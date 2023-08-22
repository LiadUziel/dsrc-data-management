import { User } from 'src/app/auth/interfaces/user-interface';
import { TeamMember } from './team-member.interface';
import { BudgetPart } from './budget-part.interface';
import { Review } from './review.interface';

export interface GrantProposal {
  _id?: string;
  type:
    | 'DS_DOCTORAL'
    | 'POST_DOCTORAL'
    | 'SEED_RESEARCH'
    | 'DATASET_COLLECTION';

  // fields just from DB - user is not fill them
  user?: User;
  applicationDate?: Date;
  status?: 'PENDING' | 'PARTIALLY_APPROVED' | 'APPROVED' | 'REJECTED';
  amountGiven?: number;

  // shared fields
  department: string;
  studyTitle: string;
  amountRequested: number;

  // DS_DOCTORAL / POST_DOCTORAL
  uploadCV?: string;
  uploadDescription?: string;
  uploadGradeTAndC?: string;
  uploadWorkCommitment?: string;
  uploadRecommendationLetter?: string;
  uploadContactRecommenders?: string;

  //DS_DOCTORAL
  uniqueFieldDsDoctoral1?: string; // required if type === "DS_DOCTORAL"
  uniqueFieldDsDoctoral2?: number; // optional

  // POST_DOCTORAL
  uniqueFieldPostDoctoral1?: string; // required if type === "POST_DOCTORAL"
  uniqueFieldPostDoctoral2?: number; // optional

  // SEED_RESEARCH(part of the fields are also at dataset collection)
  uploadResearchIntro?: string;
  uploadInnovationProject?: string;
  uploadTeam?: string;
  uploadBudget?: string;
  uploadExternalFunding?: string;
  uniqueFieldSeedResearch1?: string; // required if type === "SEED_RESEARCH"
  uniqueFieldSeedResearch2?: number; // optional
  budgetParts?: BudgetPart[];

  // DATASET_COLLECTION (which are not at seed)
  uploadDatasetInfo?: string;
  uploadEthics?: string;
  uploadCopyrights?: string;
  uniqueFieldDatasetCollection1?: string; // required if type === "DATASET_COLLECTION"
  uniqueFieldDatasetCollection2?: number; // optional

  teamMembers: TeamMember[];

  customFields?: { [key: string]: string };

  reviews: Review[];
}
