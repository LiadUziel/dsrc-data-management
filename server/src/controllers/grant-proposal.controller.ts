import { RequestHandler } from "express";
import {
  GrantProposal,
  GrantProposalModel,
} from "../models/grant-proposal.interface";
import { User, UserModel } from "../models/user.interface";
import { NewFieldRaw } from "../models/new-field-raw.interface";

export const createGrantProposal: RequestHandler = async (req, res, next) => {
  try {
    const proposal: GrantProposal = req.body;

    // get user from db
    const user: User = (await UserModel.findOne({
      email: req.authUser?.email,
    }))!;

    // add user to proposal
    proposal.user = user;

    // add application date
    proposal.applicationDate = new Date();

    // init Amount Given
    proposal.amountGiven = 0;

    const proposalDb = await GrantProposalModel.create(proposal);

    return res.status(201).send(proposalDb);
  } catch (e) {
    next(e);
  }
};

// get proposals by type or all of them from db
export const getGrantProposals: RequestHandler = async (req, res, next) => {
  try {
    let { type } = req.params;

    // check if type is legal
    type = type?.toUpperCase();
    const isLegalType: boolean = [
      "DS_DOCTORAL",
      "POST_DOCTORAL",
      "SEED_RESEARCH",
      "DATASET_COLLECTION",
    ].includes(type);

    // get proposals from db
    const proposals = await GrantProposalModel.find(
      isLegalType ? { type } : {}
    ).populate("user", "firstName lastName email -_id");

    return res.send(proposals);
  } catch (e) {
    next(e);
  }
};

// add fields to proposal
export const addFieldsToProposal: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newFieldsArr: NewFieldRaw[] = req.body.fields;

    // build new fields object
    const customFields: { [key: string]: string } = newFieldsArr.reduce(
      (acc, curr) => {
        acc[curr.fieldName] = curr.value;
        return acc;
      },
      {}
    );

    const updatedProposal = await GrantProposalModel.findByIdAndUpdate(
      id,
      { $set: { customFields } },
      {
        new: true,
      }
    );

    return res.send(updatedProposal);
  } catch (e) {
    next(e);
  }
};
