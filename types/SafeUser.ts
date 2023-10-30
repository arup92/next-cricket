export interface SafeUser {
    id: string;
    name: string | null;
    email: string;
    isActive: boolean | null;
    image: string | null;
    createdAt: Date;
}