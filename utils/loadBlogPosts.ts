import matter from 'gray-matter';

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

// This function will be replaced by a static import in Vite/React
export async function loadBlogPosts(): Promise<BlogPostMeta[]> {
  // Vite's import.meta.globEager is not available in Node, so this is a placeholder
  return [];
}

export async function loadBlogPost(slug: string): Promise<BlogPost | null> {
  // Placeholder for dynamic import
  return null;
}
