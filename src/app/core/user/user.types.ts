export interface User
{
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    intro?: string;
    hometown?: string;
    currentCity?: string;
    eduInstitution?: string;
    workplace?: string;
    profilePhoto?: string;
    coverPhoto?: string;
    role?: string;
    enabled?: boolean;
    telephone?:number;
    accountVerified?: boolean;
    emailVerified?: boolean;
    birthDate?: string;
    joinDate?: string;
    dateLastModified?: string;
    status?:any;
}
