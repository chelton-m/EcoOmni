export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  username: string;
  role: UserRole;
}

export type UserRole = 'operational_manager' | 'director' | 'system_admin';

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: LoginResponse | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}
