import mongoose, { Schema } from "mongoose";
import { User } from "./user.interface";
import { ResearchTeam } from "./researchTeam.interface";
import { publication } from "./publication.interface";
import { researchGrant } from "./researchGrant.interface";

export interface Product {
    //user does not fill
  _id?: string;
  user?: User;
  applicationDate: Date;

  //user fills
  projectTitleThatWasGranted: string;
  typeOfFundingsReceivedFromDsrc: string;
  catchyTitle: string;
  openingMotivatingSentence?: string;
  presentLink?: string;
  urlToAdd?: string;
  researchTeam: ResearchTeam[];
  oneSentenceSummarizing?: string;
  summarizingSentences?: string;
  conclusion?: string;
  uploadBlog: string;
  uploadFigureOrVideo: string;
  publications: publication[];
  researchGrants: researchGrant[];
  SDG: string[];
  government?: string;
  internationalCoopreration?: string;
  volunteerWork?: string;
  developCourses?: string;
  customFields?: { [key: string]: string };   
}

const productSchema = new Schema<Product>(
    {
        user: { type: Object, ref: "User" },
        applicationDate: { type: Date, required: true },
        projectTitleThatWasGranted: {type: String, required: true},
        typeOfFundingsReceivedFromDsrc: {type: String, required: true},
        catchyTitle: {type: String, required: true},
        openingMotivatingSentence: {type: String},
        presentLink: {type: String},
        urlToAdd: {type: String},
        researchTeam: { type: [Object], default: undefined, required: true },
        oneSentenceSummarizing: {type: String},
        summarizingSentences: {type: String},
        conclusion: {type: String},
        uploadBlog: {type: String, required: true},
        uploadFigureOrVideo: {type: String, required: true},
        publications: { type: [Object], default: undefined, required: true },
        researchGrants: { type: [Object], default: undefined, required: true },
        SDG: { type: [String], default: undefined, required: true },
        government: {type: String},
        internationalCoopreration: {type: String},
        volunteerWork: {type: String},
        developCourses: {type: String},
        customFields: { type: Object, default: undefined, required: false },  
    },
    { timestamps: true }
);

export const ProductModel = mongoose.model<Product>(
    "Product",
    productSchema
  );