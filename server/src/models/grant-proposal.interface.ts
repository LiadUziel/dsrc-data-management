import mongoose, { Schema } from "mongoose";
import { User } from "./user.interface";
import { TeamMember } from "./team-member.interface";
import { BudgetPart } from "./budget-part.interface";

export interface GrantProposal {
  _id?: string;
  type:
    | "DS_DOCTORAL"
    | "POST_DOCTORAL"
    | "SEED_RESEARCH"
    | "DATASET_COLLECTION";
  user?: User;
  applicationDate: Date;
  amountGiven: number;

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
  budgetParts?: BudgetPart[];

  // DATASET_COLLECTION
  uniqueFieldDatasetCollection1?: string; // required if type === "DATASET_COLLECTION"
  uniqueFieldDatasetCollection2?: number; // optional

  teamMembers?: TeamMember[];
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

    user: { type: Object, ref: "User" },

    department: { type: String, required: true },
    studyTitle: { type: String, required: true },
    amountRequested: { type: Number, required: true },
    amountGiven: { type: Number, required: true },
    applicationDate: { type: Date, required: true },

    // DS_DOCTORAL
    uniqueFieldDsDoctoral1: { type: String },
    uniqueFieldDsDoctoral2: { type: Number },

    // POST_DOCTORAL
    // uniqueFieldPostDoctoral1: {
    //   type: String,
    //   required: function (this: GrantProposal) {
    //     return this.type === "POST_DOCTORAL";
    //   },
    // },
    uniqueFieldPostDoctoral2: { type: Number },

    // SEED_RESEARCH
    // uniqueFieldSeedResearch1: {
    //   type: String,
    //   required: function (this: GrantProposal) {
    //     return this.type === "SEED_RESEARCH";
    //   },
    // },
    uniqueFieldSeedResearch2: { type: Number },
    budgetParts: { type: [Object], default: undefined, required: false },

    // DATASET_COLLECTION
    // uniqueFieldDatasetCollection1: {
    //   type: String,
    //   required: function (this: GrantProposal) {
    //     return this.type === "DATASET_COLLECTION";
    //   },
    // },
    uniqueFieldDatasetCollection2: { type: Number },

    teamMembers: { type: [Object], default: undefined, required: false },
  },
  { timestamps: true }
);

export const GrantProposalModel = mongoose.model<GrantProposal>(
  "GrantProposal",
  grantProposalSchema
);
