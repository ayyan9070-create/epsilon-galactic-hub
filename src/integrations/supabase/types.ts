export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      brand_ambassador_applications: {
        Row: {
          cnic: string;
          email: string;
          id: string;
          name: string;
          phone: string;
          photo_url: string | null;
          school: string;
          submitted_at: string;
        };
        Insert: {
          cnic: string;
          email: string;
          id?: string;
          name: string;
          phone: string;
          photo_url?: string | null;
          school: string;
          submitted_at?: string;
        };
        Update: {
          cnic?: string;
          email?: string;
          id?: string;
          name?: string;
          phone?: string;
          photo_url?: string | null;
          school?: string;
          submitted_at?: string;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          message: string;
          name: string;
          phone: string;
          subject: string;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          message: string;
          name: string;
          phone: string;
          subject: string;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          message?: string;
          name?: string;
          phone?: string;
          subject?: string;
          submitted_at?: string;
        };
        Relationships: [];
      };
      registrations: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          team_id: string; // 6-digit unique code
          team_name: string;
          team_leader_name: string;
          team_leader_email: string;
          team_leader_contact: string;
          team_size: number;
          members: Json[]; // array of { name, email, contact }
          modules_selected: { general: string[]; stem: string[] };
          brand_ambassador: string | null;
          status: string | null; // pending, confirmed, paid, etc
          reviewed_at: string | null;
          reviewed_by: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          team_id: string;
          team_name: string;
          team_leader_name: string;
          team_leader_email: string;
          team_leader_contact: string;
          team_size: number;
          members: Json[];
          modules_selected: { general: string[]; stem: string[] };
          brand_ambassador?: string | null;
          status?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          team_id?: string;
          team_name?: string;
          team_leader_name?: string;
          team_leader_email?: string;
          team_leader_contact?: string;
          team_size?: number;
          members?: Json[];
          modules_selected?: { general: string[]; stem: string[] };
          brand_ambassador?: string | null;
          status?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: Database["public"]["Enums"]["app_role"];
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: Database["public"]["Enums"]["app_role"];
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export const Constants = {
