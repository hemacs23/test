"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, MessageSquare, Heart } from "lucide-react"
import { useFirebaseData, writeData } from "@/lib/firebase-hooks"

interface NewsPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  family?: string
  isPinned?: boolean
  likes?: number
}

interface NewsSectionProps {
  userRole: "member" | "priest" | "admin" | null
  userToken: string | null
}

export default function NewsSection({ userRole, userToken }: NewsSectionProps) {
  const { data: postsData, loading } = useFirebaseData<Record<string, NewsPost>>("news")

  const [showNewPost, setShowNewPost] = useState(false)
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  const posts: NewsPost[] = postsData
    ? Object.entries(postsData).map(([id, post]: [string, any]) => ({
        id,
        ...post,
      }))
    : []

  const handleAddPost = async () => {
    if (!postTitle.trim() || !postContent.trim()) return

    const newPost: NewsPost = {
      id: String(posts.length + 1),
      title: postTitle,
      content: postContent,
      author: "المسؤول",
      date: new Date().toISOString().split("T")[0],
    }

    await writeData(`news/${newPost.id}`, newPost)
    setPostTitle("")
    setPostContent("")
    setShowNewPost(false)
  }

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  if (loading) {
    return (
      <section id="news" className="space-y-6">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Bell className="w-8 h-8" />
          الأخبار والإعلانات
        </h2>
        <div className="text-center text-foreground/60">جاري التحميل...</div>
      </section>
    )
  }

  return (
    <section id="news" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
          <Bell className="w-8 h-8" />
          الأخبار والإعلانات
        </h2>
        {(userRole === "priest" || userRole === "admin") && (
          <Button onClick={() => setShowNewPost(!showNewPost)} className="bg-accent hover:bg-accent/90">
            إضافة خبر جديد
          </Button>
        )}
      </div>

      {showNewPost && (
        <div className="bg-blue-50 dark:bg-slate-800 rounded-xl p-6 border-2 border-primary">
          <input
            type="text"
            placeholder="عنوان الخبر"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
          />
          <textarea
            placeholder="محتوى الخبر"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 mb-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900"
          />
          <div className="flex gap-2">
            <Button onClick={handleAddPost} className="bg-primary hover:bg-primary/90">
              نشر
            </Button>
            <Button onClick={() => setShowNewPost(false)} variant="outline">
              إلغاء
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow hover:shadow-lg transition border-r-4 ${post.isPinned ? "border-accent bg-yellow-50 dark:bg-slate-800" : "border-primary"}`}
          >
            {post.isPinned && (
              <div className="inline-block bg-accent text-white text-xs px-3 py-1 rounded-full mb-3">📌 مثبت</div>
            )}
            <h3 className="text-xl font-bold text-primary mb-2">{post.title}</h3>
            <p className="text-foreground/70 mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/60">
                {post.author} • {post.date}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 text-foreground/60 hover:text-primary transition"
                >
                  <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button className="flex items-center gap-1 text-foreground/60 hover:text-primary transition">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
