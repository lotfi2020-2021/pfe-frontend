export interface Notification
{
    id: string;
    icon?: string;
    image?: string;
    title?: string;
    content?: string;
    time: string;
    link?: string;
    useRouter?: boolean;
    isSeen: boolean;
}
