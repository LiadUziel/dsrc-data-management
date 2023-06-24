import { User } from 'src/app/auth/interfaces/user-interface';

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
  amountGiven?: number;

  // shared fields
  department: string;
  studyTitle: string;
  amountRequested: number;

  // DS_DOCTORAL
  uniqueFieldDsDoctoral1?: string; // required if type === "DS_DOCTORAL"
  uniqueFieldDsDoctoral2?: number; // optional

  // POST_DOCTORAL
  uniqueFieldPostDoctoral1?: string; // required if type === "POST_DOCTORAL"
  uniqueFieldPostDoctoral2?: number; // optional

  // SEED_RESEARCH
  uniqueFieldSeedResearch1?: string; // required if type === "SEED_RESEARCH"
  uniqueFieldSeedResearch2?: number; // optional

  // DATASET_COLLECTION
  uniqueFieldDatasetCollection1?: string; // required if type === "DATASET_COLLECTION"
  uniqueFieldDatasetCollection2?: number; // optional
}
