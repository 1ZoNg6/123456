export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    role: 'admin' | 'manager' | 'worker'
                    full_name: string
                    created_at: string
                }
                Insert: {
                    id: string
                    role?: 'admin' | 'manager' | 'worker'
                    full_name: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    role?: 'admin' | 'manager' | 'worker'
                    full_name?: string
                    created_at?: string
                }
            }
            tasks: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    status: 'pending' | 'in_progress' | 'completed'
                    priority: 'low' | 'medium' | 'high'
                    assigned_to: string | null
                    created_by: string
                    created_at: string
                    updated_at: string
                    due_date: string | null
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    status?: 'pending' | 'in_progress' | 'completed'
                    priority?: 'low' | 'medium' | 'high'
                    assigned_to?: string | null
                    created_by: string
                    created_at?: string
                    updated_at?: string
                    due_date?: string | null
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    status?: 'pending' | 'in_progress' | 'completed'
                    priority?: 'low' | 'medium' | 'high'
                    assigned_to?: string | null
                    created_by?: string
                    created_at?: string
                    updated_at?: string
                    due_date?: string | null
                }
            }
        }
    }
}