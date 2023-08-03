import { Router } from "express";
import {
  addFieldsToProposal,
  createGrantProposal,
  getGrantProposals,
} from "../controllers/grant-proposal.controller";
import {
  authorizeMiddleware,
  isAdminMiddleware,
} from "../controllers/auth.controller";

const grantProposalRouter = Router();

// Create a new grant proposal in db //* POST /api/grant-proposal
// TODO - add validators for grant proposal
grantProposalRouter.post("/", authorizeMiddleware, createGrantProposal);

// get grant proposals by type or all of them //* GET /api/grant-proposal or /api/grant-proposal/:type
grantProposalRouter.get(
  "/:type?",
  authorizeMiddleware,
  isAdminMiddleware,
  getGrantProposals
);

// add fields to proposal //* PATCH /api/grant-proposal/add-fields
grantProposalRouter.patch(
  "/add-fields/:id",
  authorizeMiddleware,
  isAdminMiddleware,
  addFieldsToProposal
);

export default grantProposalRouter;
