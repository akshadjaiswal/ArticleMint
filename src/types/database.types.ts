// src/types/database.types.ts

export type ArticleMetadata = {
  keyPoints: string[]; // An array of key points
  seoKeywords: string[]; // An array of SEO keywords
};

export type Article = {
  id: string;
  title: string | null;
  content: string | null;
  keyword: string;
  created_at: string;
  updated_at: string;
  status: 'generating' | 'completed' | 'failed';
  metadata: ArticleMetadata;
};

export type ArticleRevision = {
  id: string;
  article_id: string;
  content: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: Article;
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Article, 'id' | 'created_at' | 'updated_at'>>;
      };
      article_revisions: {
        Row: ArticleRevision;
        Insert: Omit<ArticleRevision, 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
};