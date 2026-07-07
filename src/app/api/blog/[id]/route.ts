import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { newsletterAdminAuthorized } from "@/lib/server/newsletterAuth";
import { deletePost, getPostAdmin, setPostStatus } from "@/lib/blog";
import { checkBlogPost } from "@/lib/blogQuality";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function guard(request: Request, id: string): NextResponse | null {
  if (!newsletterAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Blog not configured" },
      { status: 503 },
    );
  }
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }
  return null;
}

type Params = { params: Promise<{ id: string }> };

/** Full post (any status) for the admin preview. */
export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const denied = guard(request, id);
  if (denied) return denied;
  const post = await getPostAdmin(id);
  if (!post) {
    return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, post });
}

/** Publish or unpublish. Body: { status: "published" | "draft" }. */
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const denied = guard(request, id);
  if (denied) return denied;
  let body: { status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  if (body.status !== "published" && body.status !== "draft") {
    return NextResponse.json(
      { ok: false, error: 'status must be "published" or "draft"' },
      { status: 400 },
    );
  }

  if (body.status === "published") {
    const post = await getPostAdmin(id);
    if (!post) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 });
    }
    // Editorial gate: nothing with an em-dash or stock AI phrasing goes live.
    const problems = checkBlogPost(post);
    if (problems.length > 0) {
      return NextResponse.json(
        { ok: false, error: `Quality check failed: ${problems.join("; ")}` },
        { status: 422 },
      );
    }
  }

  const post = await setPostStatus(id, body.status);
  if (!post) {
    return NextResponse.json(
      { ok: false, error: "Could not update post" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, post: { id: post.id, status: post.status } });
}

/** Delete a draft (published posts must be unpublished first). */
export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  const denied = guard(request, id);
  if (denied) return denied;
  if (!(await deletePost(id))) {
    return NextResponse.json(
      { ok: false, error: "Could not delete (drafts only)" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
