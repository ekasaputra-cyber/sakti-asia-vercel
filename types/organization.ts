export type SocialLink = {
  platform: "instagram" | "linkedin" | "github";
  url: string;
};

export type Member = {
  id: string | number;
  name: string;
  role: string;
  image: string | null;
  period?: string;
  socials?: SocialLink[];
};

export type Division = {
  id: string;
  slug: string; // untuk dynamic route
  name: string;
  description: string;

  // 🔥 Tambahan untuk detail page
  jobdesk: string;
  programs: string[];
  skills: string[];
  projects: string[];

  members: Member[];
};