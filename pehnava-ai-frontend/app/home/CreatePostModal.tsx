"use client";

import { useState, useEffect, useRef } from "react";
import { createPost } from "../api/createPostApi";

export default function CreatePostCard({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [user, setUser] = useState<any>(null);

  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!description.trim()) {
      setError("Write something about your post.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a post title.");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("accessToken") ?? "";

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    if (photo) formData.append("photo", photo);

    try {
      await createPost(token, formData);

      setDescription("");
      setTitle("");
      setPhoto(null);
      setPreview(null);
      setError("");
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  function removeImage() {
    setPreview(null);
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 mb-8">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#1F1F1F]">Create a New Post</h2>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-[#A27B5C] text-white rounded-full text-sm font-semibold hover:bg-[#926B4B]"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[#E8E5E1] rounded-full flex items-center justify-center text-xl font-bold">
          {user?.Name?.charAt(0)}
        </div>

        <div>
          <p className="font-semibold text-[#111827]">{user?.Name}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
      </div>

      {/* Post Title */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#A27B5C]/40 outline-none flex-1 px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* Description Input */}
      <textarea
        placeholder="Share your fashion inspiration..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-[#A27B5C]/40 outline-none flex-1 px-3 py-2 border rounded-lg text-sm"
        rows={3}
      />

      {/* Image Upload */}
      <div className="mt-4 flex items-center gap-3">
        <label className="text-sm font-semibold">Upload Photo (optional)</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="!w-auto !block cursor-pointer"
        />
      </div>

      {preview && (
        <div className="w-full mt-4">
          {/* Remove Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={removeImage}
              className="px-3 py-1.5 bg-black/70 text-black text-xs rounded-full shadow"
            >
              ✕ Remove Image
            </button>
          </div>

          {/* Preview */}
          <div className="relative w-full h-[300px] rounded-xl overflow-hidden border">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </div>
  );
}
