import mongoose, { Schema } from "mongoose";

export interface GrantProposal {
  _id?: string;
  type:
    | "DS_DOCTORAL"
    | "POST_DOCTORAL"
    | "SEED_RESEARCH"
    | "DATASET_COLLECTION";
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

const grantProposalSchema = new Schema<GrantProposal>(
  {
    type: {
      type: String,
      enum: [
        "DS_DOCTORAL",
        "POST_DOCTORAL",
        "SEED_RESEARCH",
        "DATASET_COLLECTION",
      ],
      required: true,
    },
    sharedField1: { type: String, required: true },
    sharedField2: { type: String, required: true },
    sharedField3: { type: Number, required: true },
    sharedField4: { type: Boolean, required: true },

    // DS_DOCTORAL
    uniqueFieldDsDoctoral1: { type: String },
    uniqueFieldDsDoctoral2: { type: Number },

    // POST_DOCTORAL
    uniqueFieldPostDoctoral1: {
      type: String,
      required: function (this: GrantProposal) {
        return this.type === "POST_DOCTORAL";
      },
    },
    uniqueFieldPostDoctoral2: { type: Number },

    // SEED_RESEARCH
    uniqueFieldSeedResearch1: {
      type: String,
      required: function (this: GrantProposal) {
        return this.type === "SEED_RESEARCH";
      },
    },
    uniqueFieldSeedResearch2: { type: Number },

    // DATASET_COLLECTION
    uniqueFieldDatasetCollection1: {
      type: String,
      required: function (this: GrantProposal) {
        return this.type === "DATASET_COLLECTION";
      },
    },
    uniqueFieldDatasetCollection2: { type: Number },
  },
  { timestamps: true }
);

export const GrantProposalModel = mongoose.model<GrantProposal>(
  "GrantProposal",
  grantProposalSchema
);
