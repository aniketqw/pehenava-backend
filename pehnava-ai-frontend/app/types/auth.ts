export interface User {
  _id: string;
  Name: string;
  email: string;
  role: "Influencer" | "Recommender" | "Explorer" | "Marketing";
  createdAt: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
}
