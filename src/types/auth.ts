export type UserRole = "guest" | "member" | "vendor" | "admin" | "super_admin" | "moderator";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  storeName?: string;
  badgeLabel: string;
}

export interface DemoAccount {
  role: string;
  email: string;
  pass: string;
}
