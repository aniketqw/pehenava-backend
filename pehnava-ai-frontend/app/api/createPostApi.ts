import { API_BASE_URL } from "@/config/apiDomain";


export async function createPost(token: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create post");
  }

  return data;
}
