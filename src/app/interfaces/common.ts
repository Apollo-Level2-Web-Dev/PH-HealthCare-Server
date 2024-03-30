import { UserRole } from "@prisma/client";

export type IAuthUser = {
    email: string;
    role: UserRole
} | null;