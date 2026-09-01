"use client";

import { useMemo, useState } from "react";

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
  description: string;
  date: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "Top 10 tool AI hỗ trợ viết code hiệu quả",
    category: "Tool & Code",
    description: "Khám phá các công cụ AI giúp tăng tốc độ coding, tối ưu workflow và cải thiện chất lượng sản phẩm.",
    date: "15/08/2026",
  },
  {
    id: 2,
    title: "Cách tối ưu landing page bán hàng bằng Next.js",
    category: "Bài viết chia sẻ",
    description: "Hướng dẫn cách cấu trúc landing page, tối ưu tốc độ và tăng tỷ lệ chuyển đổi cho storefront.",
    date: "09/08/2026",
  },
  {
    id: 3,
    title: "Khuyến mãi mùa hè: Giảm giá lên đến 40%",
    category: "Khuyến mãi",
    description: "Danh sách ưu đãi hot trong tháng, giúp bạn tiết kiệm chi phí và cập nhật sản phẩm mới nhanh hơn.",
    date: "01/08/2026",
  },
  {
    id: 4,
    title: "Template UI React tối ưu cho e-commerce",
    category: "Tool & Code",
    description: "Một bộ mẫu giao diện hiện đại, dễ mở rộng và phù hợp với các hệ thống thương mại điện tử.",
    date: "28/07/2026",
  },
  {
    id: 5,
    title: "Kinh nghiệm xây dựng nội dung content marketing cho thương hiệu nhỏ",
    category: "Bài viết chia sẻ",
    description: "Cách lên kế hoạch nội dung, xây dựng brand voice và nuôi lượng người đọc bền vững.",
    date: "20/07/2026",
  },
  {
    id: 6,
    title: "Flash sale cuối tuần: combo tool + khóa học",
    category: "Khuyến mãi",
    description: "Ưu đãi đặc biệt dành cho khách hàng mua gói combo công cụ và tài liệu hướng dẫn chuyên sâu.",
    date: "12/07/2026",
  },
];

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Tất cả");

  const filteredPosts = useMemo(() => {
    if (activeTab === "Tất cả") return posts;
    return posts.filter((post) => post.category === activeTab);
  }, [activeTab]);

  const isLoading = false;

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

        {isLoading ? (
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
                  <span className="text-xs font-medium text-slate-500">{post.date}</span>
                </div>

                <h2 className="mb-3 text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700">
                  {post.title}
                </h2>

                <p className="text-sm leading-6 text-slate-600">{post.description}</p>

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
