"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const tabs = [
  "Tất cả",
  "Tool & Code",
  "Bài viết chia sẻ",
  "Khuyến mãi",
] as const;

type PostCategory = "Tool & Code" | "Bài viết chia sẻ" | "Khuyến mãi";

type Post = {
  id: number;
  title: string;
  category: PostCategory;
  content: string;
  created_at?: string;
};

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Tất cả");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        if (!supabase) {
          setPosts([]);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.from("posts").select("*\n").order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        const mappedPosts: Post[] = Array.isArray(data)
          ? data.map((post) => ({
              id: Number(post.id),
              title: String(post.title ?? "Untitled"),
              category: (post.category as PostCategory) ?? "Bài viết chia sẻ",
              content: String(post.content ?? ""),
              created_at: post.created_at ?? undefined,
            }))
          : [];

        setPosts(mappedPosts);
      } catch (loadError) {
        console.error("Failed to fetch posts:", loadError);
        setError("Không thể tải bài viết lúc này. Vui lòng thử lại sau.");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const postList = activeTab === "Tất cả" ? posts : posts.filter((post) => post.category === activeTab);
    return postList;
  }, [activeTab, posts]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-teal-700">
            Tin tức & cập nhật
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Bài viết & Chia sẻ
          </h1>
        </header>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-teal-700 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  ].join(" ")}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
        ) : isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 h-5 w-24 rounded-full bg-slate-200" />
                <div className="mb-3 h-6 w-3/4 rounded bg-slate-200" />
                <div className="mb-2 h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-800">Chưa có bài viết nào trong danh mục này.</p>
            <p className="mt-2 text-sm text-slate-500">Hãy thử chọn một nhóm khác hoặc quay lại sau.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-700">
                    {post.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {post.created_at ? new Date(post.created_at).toLocaleDateString("vi-VN") : "Mới"}
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700">
                  {post.title}
                </h2>

                <p className="text-sm leading-6 text-slate-600">{post.content}</p>

                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-semibold text-teal-700 transition hover:text-teal-800"
                  >
                    Đọc thêm
                    <span aria-hidden="true" className="ml-2">
                      →
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
