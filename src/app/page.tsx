import ArticleForm from '@/components/ArticleForm';

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">AI Article Generator</h1>
      <ArticleForm />
    </div>
  );
}