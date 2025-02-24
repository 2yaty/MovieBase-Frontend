export interface User {
  id: number;
  username: string;
  firstName: string;
  role: 'ROLE_ADMIN' | 'ROLE_USER';
}

export interface AuthResponse {
  token: string;
  firstName: string;
  role: string;
}