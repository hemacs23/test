"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Search, Pin, MessageSquare, Heart, Share2 } from "lucide-react"
import Footer from "@/components/footer"
import { useFirebaseData } from "@/lib/firebase-hooks"

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  authorRole: "priest" | "admin"
  date: string
  family?: string
  category: "أخبار" | "تنبيهات" | "تعليمات"
  isPinned?: boolean
  likes: number
  comments: number
}

export default function BlogPage() {
  const { data: postsData, loading } = useFirebaseData<Record<string, BlogPost>>("blog")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"جميع" | "أخبار" | "تنبيهات" | "تعليمات">("جميع")
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  const posts: BlogPost[] = postsData
    ? Object.entries(postsData).map(([id, post]: [string, any]) => ({
        id,
        ...post,
      }))
    : []

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "جميع" || post.category === selectedCategory) &&
      (post.title.includes(searchTerm) || post.content.includes(searchTerm)),
  )

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:to-slate-900">
      <Header onLoginClick={() => {}} onLogout={() => {}} userRole={null} />

      {/* Page Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2">الأخبار والمدونة</h1>
          <p className="text-foreground/70">تحديثات وأخبار الخدمة الشبابية</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="ابحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
              />
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-border pb-2">التصنيفات</h3>
              <div className="space-y-2">
                {(["جميع", "أخبار", "تنبيهات", "تعليمات"] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-right px-4 py-2 rounded-lg transition ${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-blue-50 dark:bg-slate-700 text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="bg-gradient-to-b from-primary/20 to-accent/10 rounded-xl p-6 shadow border-r-4 border-accent">
              <h3 className="text-lg font-bold text-primary mb-4">مثبت</h3>
              {posts.find((p) => p.isPinned) && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Pin className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold text-accent">مثبت</span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{posts.find((p) => p.isPinned)?.title}</h4>
                </div>
              )}
            </div>
          </aside>

          {/* Posts */}
          <div className="lg:col-span-3 space-y-6">
            {loading ? (
              <div className="text-center py-12">جاري التحميل...</div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition border-r-4 border-primary p-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {post.isPinned && (
                        <div className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                          <Pin className="w-3 h-3" />
                          مثبت
                        </div>
                      )}
                      <div>
                        <h2 className="text-2xl font-bold text-primary mb-2">{post.title}</h2>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            post.category === "أخبار"
                              ? "bg-primary"
                              : post.category === "تنبيهات"
                                ? "bg-orange-500"
                                : "bg-blue-600"
                          }`}
                        >
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-6 leading-relaxed">{post.content}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6 pb-6 border-b border-border">
                    <div>
                      <span className="font-semibold text-foreground">{post.author}</span>
                      {post.family && <span className="text-foreground/60"> • {post.family}</span>}
                    </div>
                    <span>•</span>
                    <span>{post.date}</span>
                    {post.authorRole === "priest" && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded">أب كاهن</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        likedPosts.includes(post.id)
                          ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          : "text-foreground/60 hover:bg-blue-50 dark:hover:bg-slate-700"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-foreground/60 hover:text-primary transition px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-foreground/60 hover:text-primary transition px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">مشاركة</span>
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12 bg-blue-50 dark:bg-slate-800 rounded-xl">
                <p className="text-xl text-foreground/60">لم يتم العثور على منشورات</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
