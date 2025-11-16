import { API_BASE_URL } from "@/config/apiDomain";
import type { ApiClientOptions, ApiError } from "@/app/types/api";
import type { RefreshResponse } from "@/app/types/auth";

// Helper: logout user
function logout(): never {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
  throw new Error("Logged out"); // stops execution
}

// MAIN FUNCTION — FULLY TYPED
export async function apiClient<T = any>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  let accessToken: string = localStorage.getItem("accessToken") ?? "";
  const refreshToken: string = localStorage.getItem("refreshToken") ?? "";

  const headers: Record<string, string> = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const config: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  // 1️⃣ FIRST REQUEST
  let res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // If access token is still valid
  if (res.status !== 401) {
    if (!res.ok) throw createApiError(res);
    return (await res.json()) as T;
  }

  // 2️⃣ ACCESS TOKEN EXPIRED → REFRESH
  if (!refreshToken) logout();

  const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const refreshData = (await refreshRes.json()) as RefreshResponse;

  if (!refreshRes.ok || !refreshData.accessToken) {
    logout();
  }

  // 3️⃣ SAVE NEW ACCESS TOKEN
  accessToken = refreshData.accessToken;
  localStorage.setItem("accessToken", accessToken);

  // 4️⃣ RETRY ORIGINAL REQUEST WITH NEW TOKEN
  const retryConfig: RequestInit = {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const retryRes = await fetch(`${API_BASE_URL}${endpoint}`, retryConfig);

  if (!retryRes.ok) throw createApiError(retryRes);

  return (await retryRes.json()) as T;
}

// Error helper
async function createApiError(response: Response): Promise<ApiError> {
  let message = "API request failed";

  try {
    const errorData = await response.json();
    message = errorData.message || message;
  } catch {}

  return { message, status: response.status };
}
