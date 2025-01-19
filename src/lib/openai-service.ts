import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export type GeneratedArticle = {
  title: string;
  content: string;
  metadata: {
    keyPoints: string[];
    seoKeywords: string[];
  };
};
export async function generateArticle(keyword: string): Promise<GeneratedArticle> {
  const systemPrompt = `You are an expert content writer and researcher. Create a well-structured,
  informative article about the given topic. Include a compelling title, well-organized content with
  proper headings, and key takeaways.`;
  const userPrompt = `Write a comprehensive article about "${keyword}".
  Format the response as JSON with the following structure:
  {
    "title": "Article Title",
    "content": "Full article content with proper formatting",
    "metadata": {
      "keyPoints": ["key point 1", "key point 2", ...],
      "seoKeywords": ["keyword1", "keyword2", ...]
    }
  }`;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" }
  });
  return JSON.parse(completion.choices[0].message.content!);
}