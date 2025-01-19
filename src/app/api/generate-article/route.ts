// src/app/api/generate-article/route.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { generateArticle } from "@/lib/openai-service";
import type { Database } from "@/types/database.types";

const supabase = createClientComponentClient<Database>({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

export async function POST(req: Request) {
  try {
    const { keyword, articleId } = await req.json();

    // Generate article content
    const articleData = await generateArticle(keyword);

    // Create initial revision
    const { error: revisionError } = await supabase
      .from("article_revisions")
      .insert({
        article_id: articleId,
        content: articleData.content,
      });

    if (revisionError) throw revisionError;

    // Update article with generated content
    const { error: updateError } = await supabase
      .from("articles")
      .update({
        title: articleData.title,
        content: articleData.content,
        status: "completed",
        metadata: articleData.metadata,
      })
      .eq("id", articleId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in generate-article route:", error);
    return NextResponse.json(
      { error: "Failed to generate article" },
      { status: 500 }
    );
  }
}
