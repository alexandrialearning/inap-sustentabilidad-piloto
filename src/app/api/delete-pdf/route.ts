import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "No se proporcionó un ID válido" }, { status: 400 });
    }

    await adminDb.collection("knowledge_base").doc(id).delete();

    return NextResponse.json({ 
      success: true, 
      message: "Documento eliminado correctamente" 
    });

  } catch (error: any) {
    console.error("Error deleting PDF:", error);
    return NextResponse.json({ error: error.message || "Error al eliminar el archivo" }, { status: 500 });
  }
}
