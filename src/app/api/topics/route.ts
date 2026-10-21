import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/topics
 * Returns the knowledge_base modules visible to the signed-in user.
 *  - Docs without `assignedTo` (or empty) are public: every student sees them.
 *  - Docs with `assignedTo: [emails]` are only visible to those students.
 * GET /api/topics?all=1 returns every module (used by the teacher dashboard).
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const email = (decoded.email || "").toLowerCase();
    const showAll = new URL(request.url).searchParams.get("all") === "1";

    const snapshot = await adminDb.collection("knowledge_base").orderBy("createdAt", "desc").get();

    const topics = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        const assignedTo: string[] = Array.isArray(data.assignedTo)
          ? data.assignedTo.map((e: string) => e.toLowerCase())
          : [];
        return {
          id: doc.id,
          title: data.title as string,
          fileName: data.fileName as string,
          createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? null,
          assignedTo,
        };
      })
      .filter((t) => showAll || t.assignedTo.length === 0 || t.assignedTo.includes(email));

    return NextResponse.json({ topics });
  } catch (error: any) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ error: error?.message || "Error al obtener módulos" }, { status: 500 });
  }
}
