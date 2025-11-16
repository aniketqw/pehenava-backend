import { API_BASE_URL } from "@/config/apiDomain";

export async function sendFeedback(
  token: string,
  postName: string,
  like: boolean,
  description: string
) {
  console.log("PostName --> ", postName);
  const res = await fetch(`${API_BASE_URL}/api/posts/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      postName: postName,
      like: like,
      description: description,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
}
