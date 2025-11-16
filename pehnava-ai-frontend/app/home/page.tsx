"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { logoutUser } from "../utils/logout";
import { API_BASE_URL } from "@/config/apiDomain";
import { getAllPosts } from "../api/postsApi";
import { sendFeedback } from "../api/feedbackApi";
import CreatePostCard from "./CreatePostModal";

export default function HomeFeed() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [openSharePostId, setOpenSharePostId] = useState<string | null>(null);

  const [commentInput, setCommentInput] = useState<{
    [postId: string]: string;
  }>({});

  // Load user + posts
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (!userString || !token) {
      window.location.href = "/login";
      return;
    }

    const parsedUser = JSON.parse(userString);
    setUser(parsedUser);

    fetchPosts(token);
  }, [refreshTrigger]);

  async function fetchPosts(token: string) {
    try {
      const data = await getAllPosts(token);
      setPosts(data.posts);
    } catch (err: any) {
      console.error(err);
      logoutUser();
    }
    setLoading(false);
  }

  if (!user || loading) {
    return <div className="p-8 text-center text-xl">Loading posts...</div>;
  }

  const canShare = user.role === "Influencer";

  // LIKE logic
  async function handleLike(post: any) {
    try {
      const token = localStorage.getItem("accessToken") ?? "";

      const result = await sendFeedback(
        token,
        post.name,
        true,
        "" // no description for like
      );

      // Update likes count from backend
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === post.postId
            ? { ...p, likesCount: result.postStats.likesCount }
            : p
        )
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  // COMMENT logic
  async function addComment(post: any, text: string) {
    if (!text.trim()) return;

    try {
      const token = localStorage.getItem("accessToken") ?? "";

      const result = await sendFeedback(token, post.name, false, text);

      const newFeedback = {
        id: result.feedback.feedbackId,
        userName: user.Name,
        description: result.feedback.description,
      };

      setPosts((prev) =>
        prev.map((p) =>
          p.postId === post.postId
            ? { ...p, feedbacks: [...(p.feedbacks || []), newFeedback] }
            : p
        )
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F4] font-[Inter] px-4 py-6 relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F1F1F]">Pehnava Feed</h1>

        <button
          onClick={logoutUser}
          className="px-4 py-2 bg-[#111827] text-white rounded-lg hover:bg-black transition-all"
        >
          Logout
        </button>
      </header>

      <div className="max-w-xl mx-auto">
        <CreatePostCard
          onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
        />
      </div>

      {/* Posts List */}
      <div className="flex flex-col gap-8 max-w-xl mx-auto pb-24">
        {posts.map((p: any) => {
          const isRecommenderPost = p.creator.role === "Recommender";

          return (
            <div
              key={p.postId}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              {/* IMAGE */}
              <div className="relative w-full h-[360px]">
                {p.photo ? (
                  <Image
                    src={p.photo}
                    fill
                    alt="Post"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                    <span className="text-gray-600">No Image</span>
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col">
                {/* CREATOR */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#E8E5E1] rounded-full flex items-center justify-center text-xl font-bold">
                    {p.creator.Name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-[#111827]">
                      {p.creator.Name}
                    </p>
                    <p className="text-sm text-gray-500">{p.creator.role}</p>
                  </div>
                </div>

                {/* TITLE & DESCRIPTION */}
                <h2 className="text-xl font-bold">{p.name}</h2>
                <p className="text-sm text-gray-700 mt-1">{p.description}</p>

                {/* LIKE + SHARE */}
                <div className="flex justify-between items-center mt-4">
                  {/* LIKE (Disabled for Recommender posts) */}
                  {!isRecommenderPost && (
                    <button
                      onClick={() => handleLike(p)}
                      className="text-[#A27B5C] font-semibold hover:text-[#926B4B]"
                    >
                      🤎 Like
                    </button>
                  )}

                  {/* Likes Count */}
                  {!isRecommenderPost && (
                    <span className="text-sm text-gray-600">
                      {p.likesCount} Likes
                    </span>
                  )}

                  {/* SHARE (Influencer only) */}
                  {canShare && !isRecommenderPost && (
                    <button
                      onClick={() =>
                        setOpenSharePostId(
                          openSharePostId === p.postId ? null : p.postId
                        )
                      }
                      className="text-[#A27B5C] underline hover:text-[#926B4B]"
                    >
                      Share
                    </button>
                  )}
                </div>

                {/* SHARE MENU */}
                {openSharePostId === p.postId && (
                  <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-md p-3">
                    <p className="text-sm font-semibold mb-2">
                      Share this post
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {/* WhatsApp */}
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(
                              window.location.href
                            )}`
                          )
                        }
                        className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600"
                      >
                        WhatsApp
                      </button>

                      {/* Instagram (Copy URL) */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Post link copied! paste it in Instagram.");
                        }}
                        className="flex items-center gap-2 bg-pink-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-pink-600"
                      >
                        Instagram
                      </button>

                      {/* Pinterest */}
                      <button
                        onClick={() =>
                          window.open(
                            `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                              window.location.href
                            )}&media=${encodeURIComponent(p.photo || "")}`
                          )
                        }
                        className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600"
                      >
                        Pinterest
                      </button>

                      {/* Facebook */}
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.href
                            )}`
                          )
                        }
                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                      >
                        Facebook
                      </button>

                      {/* Copy Link */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied!");
                        }}
                        className="flex items-center gap-2 bg-gray-200 text-black px-3 py-2 rounded-lg text-sm hover:bg-gray-300"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>
                )}

                {/* COMMENTS SECTION */}
                {!isRecommenderPost && (
                  <div className="mt-5">
                    <p className="font-semibold">Comments:</p>

                    {/* Existing Comments */}
                    <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                      {(p.feedbacks || []).map(
                        (f: any, index: number) =>
                          f.description && (
                            <div
                              key={index}
                              className="bg-[#F7EDE2] p-2 rounded-lg text-sm"
                            >
                              <strong>{f.userName}: </strong>
                              {f.description}
                            </div>
                          )
                      )}
                    </div>

                    {/* COMMENT INPUT — hidden if user already commented */}
                    {!p.feedbacks?.some((f: any) => f.userName === user.Name) && (
                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentInput[p.postId] || ""}
                          onChange={(e) =>
                            setCommentInput({
                              ...commentInput,
                              [p.postId]: e.target.value,
                            })
                          }
                          className="flex-1 px-3 py-2 border rounded-lg text-sm"
                        />

                        <button
                          className="px-3 py-2 bg-[#111827] text-white rounded-lg"
                          onClick={() =>
                            addComment(p, commentInput[p.postId] || "")
                          }
                        >
                          Post
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI SUGGESTION CARD */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all mt-4">
          <div className="relative w-full h-[300px]">
            <Image
              src="/ai-fashion.jpg"
              fill
              alt="AI Suggestions"
              className="object-cover"
            />
          </div>

          <div className="p-5">
            <h2 className="text-xl font-bold text-[#1F1F1F]">
              Didn’t find what you're looking for?
            </h2>

            <p className="text-sm text-gray-700 mt-1">
              Let Pehnava AI help you discover outfits tailored to your taste.
            </p>

            <a
              href="https://samplefashionrecommender-amazonurls.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-5 py-2 bg-[#A27B5C] text-white rounded-full text-sm font-semibold hover:bg-[#926B4B]"
            >
              Get AI Suggestions
            </a>
          </div>
        </div>
      </div>

      {/* Floating Create Post */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-[#A27B5C] text-white px-6 py-4 rounded-full shadow-xl hover:bg-[#926B5C]"
      >
        + Create Post
      </button>
    </div>
  );
}
