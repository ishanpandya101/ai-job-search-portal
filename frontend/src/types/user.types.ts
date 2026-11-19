// File path: src/types/user.types.ts

export interface UserProfile {
  id: string;
  firstName: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}