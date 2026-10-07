"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Image from "next/image";

type Topic = {
  id: string;
  title: string;
  fileName: string;
  createdAt: any;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        fetchTopics();
      }
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchTopics = async () => {
    setIsLoadingTopics(true);
    try {
      const q = query(collection(db, "knowledge_base"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedTopics = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        fileName: doc.data().fileName,
        createdAt: doc.data().createdAt
      }));
      setTopics(fetchedTopics);
    } catch (err) {
      console.error("Error fetching topics:", err);
    } finally {
      setIsLoadingTopics(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Por favor selecciona un archivo PDF primero.");
      return;
    }

    setIsUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Éxito: "${data.title}" se ha procesado y guardado en la base de datos.`);
        setFile(null);
        fetchTopics(); // Refresh the table
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err: any) {
      setMessage(`❌ Ocurrió un error inesperado al subir el archivo.`);
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente "${title}"?`)) {
      return;
    }
    
    try {
      const res = await fetch(`/api/delete-pdf?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage(`✅ Eliminado: El documento fue borrado con éxito.`);
        fetchTopics();
      } else {
        const data = await res.json();
        setMessage(`❌ Error al eliminar: ${data.error}`);
      }
    } catch (err) {
      setMessage(`❌ Error de red al intentar eliminar.`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (isAuthChecking || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-gray-500 font-medium">Cargando panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="relative w-24 h-10 mb-4 brightness-0 invert">
            <Image src="/inap-logo.png" alt="Logo INAP" fill className="object-contain" priority />
          </div>
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Portal Profesores</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-purple-700 text-white rounded-lg font-medium shadow-sm transition-colors">
            📚 Documentos (PDF)
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors" disabled>
            📊 Analítica (Próximamente)
          </button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors" disabled>
            👥 Alumnos (Próximamente)
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-400 mb-4 px-2 truncate">
            👤 {user.email}
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900 hover:text-red-300 rounded-lg font-medium transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white px-8 py-5 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Módulos (Base de Conocimiento)</h1>
          <Link href="/" className="text-sm font-medium text-purple-600 hover:text-purple-800 bg-purple-50 px-4 py-2 rounded-lg transition-colors">
            ↗ Ver Vista de Alumno
          </Link>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
          
          {/* Subir Documento */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Añadir Nuevo Documento</h2>
            <p className="text-sm text-gray-500 mb-6">
              Sube normativas o temarios en formato PDF. La IA los procesará automáticamente para generar los cursos de los alumnos.
            </p>
            
            <form onSubmit={handleUpload} className="flex items-center gap-4">
              <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => {
                    setFile(e.target.files ? e.target.files[0] : null);
                    setMessage("");
                  }}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100 cursor-pointer"
                />
              </div>
              <button 
                type="submit" 
                disabled={!file || isUploading}
                className="bg-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                {isUploading ? "Procesando IA..." : "Subir PDF"}
              </button>
            </form>

            {message && (
              <div className={`mt-4 p-4 rounded-lg font-medium text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                {message}
              </div>
            )}
          </section>

          {/* Tabla de Documentos */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Módulos Activos</h2>
            </div>
            
            {isLoadingTopics ? (
              <div className="p-8 text-center text-gray-500">Cargando base de datos...</div>
            ) : topics.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <div className="text-4xl mb-4">📄</div>
                No hay documentos subidos. Sube tu primer PDF arriba.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-white border-b border-gray-200 text-gray-900">
                    <tr>
                      <th className="px-6 py-4 font-bold">Título del Módulo</th>
                      <th className="px-6 py-4 font-bold">Archivo Original</th>
                      <th className="px-6 py-4 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topics.map(topic => (
                      <tr key={topic.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{topic.title}</td>
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{topic.fileName}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDelete(topic.id, topic.title)}
                            className="text-red-500 hover:text-red-700 font-medium text-xs px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
