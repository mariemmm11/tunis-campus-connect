export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string
          formation_id: string | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          formation_id?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          formation_id?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
      careers: {
        Row: {
          created_at: string
          description: string | null
          id: string
          prospects: string | null
          required_education:
            | Database["public"]["Enums"]["education_level"]
            | null
          salary_range: string | null
          sector_id: string | null
          skills: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          prospects?: string | null
          required_education?:
            | Database["public"]["Enums"]["education_level"]
            | null
          salary_range?: string | null
          sector_id?: string | null
          skills?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          prospects?: string | null
          required_education?:
            | Database["public"]["Enums"]["education_level"]
            | null
          salary_range?: string | null
          sector_id?: string | null
          skills?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "careers_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          date_end: string | null
          date_start: string
          description: string | null
          id: string
          location: string | null
          organizer: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          date_end?: string | null
          date_start: string
          description?: string | null
          id?: string
          location?: string | null
          organizer?: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          date_end?: string | null
          date_start?: string
          description?: string | null
          id?: string
          location?: string | null
          organizer?: string | null
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: string
          user_id?: string
        }
        Relationships: []
      }
      formations: {
        Row: {
          career_prospects: string[] | null
          cost: number | null
          created_at: string
          description: string | null
          duration: string | null
          id: string
          level: Database["public"]["Enums"]["education_level"]
          location: string | null
          prerequisites: string[] | null
          sector_id: string | null
          title: string
          university: string | null
          updated_at: string
        }
        Insert: {
          career_prospects?: string[] | null
          cost?: number | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          level: Database["public"]["Enums"]["education_level"]
          location?: string | null
          prerequisites?: string[] | null
          sector_id?: string | null
          title: string
          university?: string | null
          updated_at?: string
        }
        Update: {
          career_prospects?: string[] | null
          cost?: number | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          level?: Database["public"]["Enums"]["education_level"]
          location?: string | null
          prerequisites?: string[] | null
          sector_id?: string | null
          title?: string
          university?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formations_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          education_level: Database["public"]["Enums"]["education_level"] | null
          first_name: string | null
          id: string
          interests: string[] | null
          last_name: string | null
          university: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          first_name?: string | null
          id: string
          interests?: string[] | null
          last_name?: string | null
          university?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          first_name?: string | null
          id?: string
          interests?: string[] | null
          last_name?: string | null
          university?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sectors: {
        Row: {
          color: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      test_results: {
        Row: {
          answers: Json
          completed_at: string
          id: string
          recommendations: string[] | null
          score: number | null
          test_id: string
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string
          id?: string
          recommendations?: string[] | null
          score?: number | null
          test_id: string
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          id?: string
          recommendations?: string[] | null
          score?: number | null
          test_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_results_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          created_at: string
          description: string | null
          id: string
          questions: Json
          title: string
          type: Database["public"]["Enums"]["test_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          questions: Json
          title: string
          type: Database["public"]["Enums"]["test_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          questions?: Json
          title?: string
          type?: Database["public"]["Enums"]["test_type"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "en_cours" | "accepte" | "refuse" | "en_attente"
      education_level:
        | "bac"
        | "licence"
        | "master"
        | "doctorat"
        | "formation_pro"
      event_type: "jpo" | "salon" | "conference" | "atelier"
      test_type:
        | "orientation_metiers"
        | "personnalite"
        | "interets"
        | "competences"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["en_cours", "accepte", "refuse", "en_attente"],
      education_level: [
        "bac",
        "licence",
        "master",
        "doctorat",
        "formation_pro",
      ],
      event_type: ["jpo", "salon", "conference", "atelier"],
      test_type: [
        "orientation_metiers",
        "personnalite",
        "interets",
        "competences",
      ],
    },
  },
} as const
