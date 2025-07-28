

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

function parseFrontmatter(raw: string): { data: any } {
  const match = /^---\n([\s\S]+?)\n---/.exec(raw);
  if (!match) return { data: {} };
  const lines = match[1].split('\n');
  const data: any = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
    }
  }
  return { data };
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);

  useEffect(() => {
    // Vite-specific: import all markdown files in blog/
    const modules = import.meta.glob('/blog/*.md', { eager: true, as: 'raw' });
    const loadedPosts: BlogPostMeta[] = Object.entries(modules).map(([path, raw]) => {
      const { data } = parseFrontmatter((raw as string) || '');
      const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
      };
    });
    // Sort by date descending
    loadedPosts.sort((a, b) => b.date.localeCompare(a.date));
    setPosts(loadedPosts);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-center text-slate-500">Brak wpisów na blogu.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.slug} className="border-b pb-4">
              <Link to={`/blog/${post.slug}`} className="text-xl font-semibold text-accent hover:underline">
                {post.title}
              </Link>
              <div className="text-xs text-slate-400 mt-1">{post.date}</div>
              {post.description && <div className="mt-2 text-slate-600">{post.description}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPage;
