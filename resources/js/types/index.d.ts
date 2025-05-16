import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface CategoryProps {
    id: number;
    user_id: number | null;
    name: string;
    slug: string;
    color: string;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
interface Todo {
    id: number,
    user_id: number;           // Kullanıcı ID'si (todo'nun sahibi)
    category_id?: number | null;      // Kategori ID'si
    parent_id?: number | null;        // Üst todo ID'si (alt görevler için)
    title: string;            // Görev başlığı
    description?: string | null;      // Görev açıklaması
    priority?: 'low' | 'medium' | 'high';         // Öncelik (low, medium, high)
    status?: 'pending' | 'in_progress' | 'completed' | 'archived';           // Durum (pending, in_progress, completed, archived)
    due_date?: string | null;         // Bitiş tarihi (ISO formatında string olabilir)
    completed_at?: string | null;     // Tamamlanma tarihi (ISO formatında string olabilir)
    is_recurring?: boolean;     // Tekrarlayan görev mi? (boolean)
    recurring_pattern?: 'daily' | 'weekly' | 'monthly' | 'yearly' | null; // Tekrarlama periyodu (daily, weekly, monthly, yearly)
    recurring_interval?: number | null; // Tekrarlama aralığı (sayısal değer)
    recurring_end_date?: string | null; // Tekrarlama bitiş tarihi (ISO formatında string olabilir)
    position?: number;         // Sıralama pozisyonu
    tags?: string[] | null;             // Etiketler (dizi olarak veya JSON string'den parse edilebilir)
    is_private?: boolean;        // Özel görev mi? (boolean)
    category: { name: string }; // İlişkili kategori
}
