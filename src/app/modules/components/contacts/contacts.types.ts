export interface Contact
{
    id: any;
    avatar?: string | null;
    background?: string | null;
    name: any;
    emails?: {
        email: string;
        label: string;
    }[];
    phoneNumbers?: {
        country: any;
        phoneNumber: string;
        label: string;
    }[];
    title?: any;
    company?: string;
    birthday?: string | null;
    address?: string | null;
    notes?: string | null;
    tags: string[];
}

export interface Country
{
    id: any;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface Tag
{
    id?: any;
    title?: string;
}
