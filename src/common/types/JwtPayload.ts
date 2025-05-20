import { AuthRoles } from "./auth.type";

export interface JwtPayload{ 
    id: number,
    role: AuthRoles
}