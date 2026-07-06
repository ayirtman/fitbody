import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/server/supabase";
import { newsletterAdminAuthorized } from "@/lib/server/newsletterAuth";
import {
  deleteIssue,
  getIssue,
  isIssueId,
  updateIssue,
} from "@/lib/newsletter/issues";

function guard(request: Request, id: string): NextResponse | null {
  if (!newsletterAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!supabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 503 },
    );
  }
  if (!isIssueId(id)) {
    return NextResponse.json({ ok: false, error: "Invalid issue id" }, { status: 400 });
  }
  return null;
}

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const denied = guard(request, id);
  if (denied) return denied;
  const issue = await getIssue(id);
  if (!issue) {
    return NextResponse.json({ ok: false, error: "Issue not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, issue });
}

/** Edit a draft's subject and/or html. Sent issues are immutable. */
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const denied = guard(request, id);
  if (denied) return denied;

  let body: { subject?: unknown; html?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const fields: { subject?: string; html?: string } = {};
  if (typeof body.subject === "string" && body.subject.trim()) {
    fields.subject = body.subject.trim();
  }
  if (typeof body.html === "string" && body.html.trim()) {
    fields.html = body.html;
  }
  if (!fields.subject && !fields.html) {
    return NextResponse.json(
      { ok: false, error: "Provide subject and/or html" },
      { status: 400 },
    );
  }

  const existing = await getIssue(id);
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Issue not found" }, { status: 404 });
  }
  if (existing.status !== "draft") {
    return NextResponse.json(
      { ok: false, error: "Sent issues cannot be edited" },
      { status: 409 },
    );
  }
  const issue = await updateIssue(id, fields);
  if (!issue) {
    return NextResponse.json(
      { ok: false, error: "Could not update issue" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, issue });
}

/** Delete a draft. Sent issues stay as the archive. */
export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  const denied = guard(request, id);
  if (denied) return denied;
  const ok = await deleteIssue(id);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Could not delete issue" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
