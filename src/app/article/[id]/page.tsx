// src/app/article/[id]/page.tsx
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default async function ArticlePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClientComponentClient<Database>();

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (!article) {
    return <div>Article not found</div>;
  }

  // Ensure article.metadata is parsed if stored as a JSON string
  const metadata = typeof article.metadata === 'string'
    ? JSON.parse(article.metadata)
    : article.metadata;

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <p className="text-gray-500">Generated from keyword: {article.keyword}</p>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-6">
            <h2>Article Content</h2>
            {/* Rendering HTML content safely */}
            <div
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />
          </div>

          <div className="prose max-w-none">
            <h2>Key Points</h2>
            <ul>
              {metadata?.keyPoints?.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <h2>SEO Keywords</h2>
            <p>{metadata?.seoKeywords?.join(', ') || 'None provided'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
