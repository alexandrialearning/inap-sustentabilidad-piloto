import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse the PDF (pdf-parse v2 API)
    const parser = new PDFParse({ data: buffer });
    let extractedText = "";
    try {
      const result = await parser.getText();
      extractedText = result.text;
    } finally {
      await parser.destroy();
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF (¿es un documento escaneado como imagen?)" },
        { status: 422 }
      );
    }

    // Clean title (remove extension)
    const title = file.name.replace(/\.[^/.]+$/, "");

    // Save to Firestore using admin SDK to bypass rules
    const docRef = await adminDb.collection("knowledge_base").add({
      title,
      content: extractedText,
      fileName: file.name,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      title,
      message: "Documento procesado y guardado correctamente",
    });
  } catch (error: any) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({ error: error?.message || "Error al procesar el archivo" }, { status: 500 });
  }
}
