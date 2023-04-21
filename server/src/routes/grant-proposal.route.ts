import { Router } from "express";
import { createGrantProposal } from "../controllers/grant-proposal.controller";
import { authorizeMiddleware } from "../controllers/auth.controller";

const grantProposalRouter = Router();

// Create a new grant proposal in db
// TODO - add validators for grant proposal
grantProposalRouter.post("/", authorizeMiddleware, createGrantProposal);

export default grantProposalRouter;
