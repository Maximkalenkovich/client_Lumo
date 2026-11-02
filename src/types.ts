export type Gender = "male" | "female";
export type LookingFor = Gender | "any";

export type Photo = {
  id: string;
  url: string;
};

export type PublicProfile = {
  id: number;
  firstName: string | null;
  gender: Gender | null;
  age: number | null;
  city: string | null;
  bio: string | null;
  photos: Photo[];
};

export type MyProfile = PublicProfile & {
  lookingFor: LookingFor | null;
  dateOfBirth: string | null;
  tgUsername: string | null;
  isComplete: boolean;
};

export type Match = {
  id: number;
  createdAt: string;
  user: PublicProfile & { tgUsername: string | null };
};

export const REPORT_REASONS = [
  "fake",
  "spam",
  "inappropriate",
  "underage",
  "other",
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];
