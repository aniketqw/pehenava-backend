import { API_BASE_URL } from "@/config/apiDomain";


export async function getAllPosts(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}
