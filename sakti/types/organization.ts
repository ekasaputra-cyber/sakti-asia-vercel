export type SocialLink = {
  platform: "instagram" | "linkedin" | "github";
  url: string;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  image: string; // Path ke public folder, misal '/team/ketua.jpg'
  period?: string; // Khusus demisioner
  socials?: SocialLink[];
};

export type Division = {
  id: string;
  name: string;
  description: string;
  members: Member[]; // Array of Member
};