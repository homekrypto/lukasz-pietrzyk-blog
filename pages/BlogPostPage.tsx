
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

function parseFrontmatterAndContent(raw: string): { data: any; content: string } {
  const match = /^---\n([\s\S]+?)\n---/.exec(raw);
  if (!match) return { data: {}, content: raw };
  const lines = match[1].split('\n');
  const data: any = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
    }
  }
  const content = raw.slice(match[0].length).trim();
  return { data, content };
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<{ meta: BlogPostMeta; content: string } | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    // Vite-specific: import all markdown files in blog/
    const modules = import.meta.glob('/blog/*.md', { eager: true, as: 'raw' });
    const match = Object.entries(modules).find(([path]) => path.endsWith(`/${slug}.md`));
    if (!match) {
      setNotFound(true);
      return;
    }
    const [path, raw] = match;
    const { data, content } = parseFrontmatterAndContent((raw as string) || '');
    setPost({
      meta: {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
      },
      content,
    });
  }, [slug]);

  if (notFound) {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Nie znaleziono wpisu</h1>
          <Link to="/blog" className="text-accent hover:underline">Powrót do bloga</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Header />
      <article className="max-w-2xl mx-auto py-12 px-4 prose dark:prose-invert">
        <Link to="/blog" className="text-accent hover:underline">← Powrót do bloga</Link>
        <h1 className="mt-4 mb-2 text-3xl font-bold">{post.meta.title}</h1>
        <div className="text-xs text-slate-400 mb-6">{post.meta.date}</div>
        <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
      </article>
      <Footer />
    </>
  );
};

export default BlogPostPage;
