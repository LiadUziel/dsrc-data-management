import { Router } from "express";
import {
  addFieldsToProposal,
  createGrantProposal,
  getDepartments,
  getGrantProposals,
  getReviewersProposals,
  getTeamMembersProposals,
  getUserProposals,
  updateProposalStatus,
} from "../controllers/grant-proposal.controller";
import {
  authorizeMiddleware,
  isAdminMiddleware,
} from "../controllers/auth.controller";

const grantProposalRouter = Router();

// get proposals that the logged user is reviewer in them
grantProposalRouter.get(
  "/reviewer",
  authorizeMiddleware,
  getReviewersProposals
);

// get proposals that the logged user is teamMember in them
grantProposalRouter.get(
  "/team-member",
  authorizeMiddleware,
  getTeamMembersProposals
);

// get grant proposals of logged user //* GET /api/grant-proposal/logged-user
grantProposalRouter.get("/logged-user", authorizeMiddleware, getUserProposals);

// Create a new grant proposal in db //* POST /api/grant-proposal
grantProposalRouter.post("/", authorizeMiddleware, createGrantProposal);

// Get departments
grantProposalRouter.get("/departments", authorizeMiddleware, getDepartments);

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

// update proposal status //* PATCH /api/grant-proposal/update-status
grantProposalRouter.patch(
  "/update-status/:id",
  authorizeMiddleware,
  isAdminMiddleware,
  updateProposalStatus
);

export default grantProposalRouter;
