import { Role } from "./user.interface";

export interface TeamMember {
  memberEmail: string;
  memberRole: Role;
  fullName: string;
}
