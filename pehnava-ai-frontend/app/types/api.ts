export interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
}

export interface ApiError {
  message: string;
  status?: number;
}
