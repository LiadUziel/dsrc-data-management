export interface GrantProposal {
  _id?: string;
  type:
    | 'DS_DOCTORAL'
    | 'POST_DOCTORAL'
    | 'SEED_RESEARCH'
    | 'DATASET_COLLECTION';
  sharedField1: string;
  sharedField2: string;
  sharedField3: number;
  sharedField4: boolean;

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
