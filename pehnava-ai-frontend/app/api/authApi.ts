import { API_BASE_URL } from "@/config/apiDomain";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function registerUser(
  Name: string,
  email: string,
  password: string,
  role: string
) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Name, email, password, role }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}

// REFRESH API
export async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  return response.json();
}
