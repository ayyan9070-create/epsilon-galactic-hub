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
      /* ================================
       BRAND AMBASSADOR APPLICATIONS
      ================================== */
      brand_ambassador_applications: {
  Row: {
    id: string;
    name: string;
    email: string;
    phone: string;
    cnic: string;
    school: string;
    photo_url: string | null;
    submitted_at: string;
    status: "pending" | "approved" | "rejected"; // new field
  };
  Insert: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    cnic: string;
    school: string;
    photo_url?: string | null;
    submitted_at?: string;
    status?: "pending" | "approved" | "rejected"; // optional on insert
  };
  Update: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    cnic?: string;
    school?: string;
    photo_url?: string | null;
    submitted_at?: string;
    status?: "pending" | "approved" | "rejected"; // optional on update
  };
  Relationships: [];
};

      /* ================================
       APPROVED BRAND AMBASSADORS
      ================================== */
      brand_ambassadors: {
        Row: {
          id: string;
          name: string;
          school: string | null;
          status: "pending" | "approved" | "rejected";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          school?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          school?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
        };
        Relationships: [];
      };

      /* ================================
       CONTACT FORM
      ================================== */
      contacts: {
        Row: {
          id: string;
          name: string;
          phone: string;
          subject: string;
          message: string;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          subject: string;
          message: string;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          subject?: string;
          message?: string;
          submitted_at?: string;
        };
        Relationships: [];
      };

      /* ================================
       REGISTRATIONS TABLE (MAIN)
      ================================== */
      registrations: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;

          team_id: string; // 6-digit unique
          team_name: string;
          team_leader_name: string;
          team_leader_email: string;
          team_leader_contact: string;
          team_leader_institute: string;

          team_size: number;

          members: Json[]; // { name, email, contact, institute }

          modules_selected: { general: string[]; stem: string[] };

          brand_ambassador: string | null;

          payment_proof: string | null; // image URL
          challan_total: number | null; // total amount

          status: "pending" | "unpaid" | "paid" | "verified" | null;
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
          team_leader_institute: string;

          team_size: number;

          members: Json[];

          modules_selected: { general: string[]; stem: string[] };

          brand_ambassador?: string | null;

          payment_proof?: string | null;
          challan_total?: number | null;

          status?: "pending" | "unpaid" | "paid" | "verified" | null;
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
          team_leader_institute?: string;

          team_size?: number;

          members?: Json[];

          modules_selected?: { general: string[]; stem: string[] };

          brand_ambassador?: string | null;

          payment_proof?: string | null;
          challan_total?: number | null;

          status?: "pending" | "unpaid" | "paid" | "verified" | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
        };
        Relationships: [];
      };

      /* ================================
       TEAM MEMBERS (optional but recommended)
      ================================== */
      team_members: {
        Row: {
          id: string;
          team_id: string;
          name: string;
          email: string;
          contact: string;
          institute: string;
        };
        Insert: {
          id?: string;
          team_id: string;
          name: string;
          email: string;
          contact: string;
          institute: string;
        };
        Update: {
          id?: string;
          team_id?: string;
          name?: string;
          email?: string;
          contact?: string;
          institute?: string;
        };
        Relationships: [];
      };

      /* ================================
       USER ROLES
      ================================== */
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
