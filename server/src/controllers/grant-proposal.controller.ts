import { RequestHandler } from "express";
import {
  GrantProposal,
  GrantProposalModel,
} from "../models/grant-proposal.interface";

export const createGrantProposal: RequestHandler = async (req, res, next) => {
  try {
    const proposal: GrantProposal = req.body;

    const proposalDb = await GrantProposalModel.create(proposal);

    return res.status(201).send(proposalDb);
  } catch (e) {
    next(e);
  }
};
