
export interface UserData {
    _id: string;
    id: string;
    isadmin: number | null | string;
    name: string;
    email: string;
    password: string;   
    plans: Plans;
    isFree?: string;
    status?: 'inactive' | 'active_paid' | 'active_subscription';
    phone?: string;
    weddingDate?: string;
    created_at?: string;
}

export type Plans = "basic" | "premium" | "vip"