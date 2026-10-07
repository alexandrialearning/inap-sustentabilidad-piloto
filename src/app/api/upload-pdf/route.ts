import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  const pdfParse = require("pdf-parse");
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse the PDF
    const data = await pdfParse(buffer);
    const extractedText = data.text;

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
      message: "Documento procesado y guardado correctamente" 
    });

  } catch (error: any) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({ error: error.message || "Error al procesar el archivo" }, { status: 500 });
  }
}
