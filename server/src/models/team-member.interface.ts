import { Role } from "./user.interface";

export interface TeamMember {
  memberName: string;
  memberEmail: string;
  memberDepartment: string;
  memberRole: Role;
}
