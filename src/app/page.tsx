"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import ChatTutor from "@/components/ChatTutor";
import { Orb } from "@/components/Orb";

type Slide = {
  title: string;
  content: string;
  icon: string;
};

type Topic = {
  id: string;
  title: string;
  fileName: string;
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // App state
  const [availableTopics, setAvailableTopics] = useState<Topic[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [learningStyle, setLearningStyle] = useState<string>("Práctico");
  const [interestReason, setInterestReason] = useState<string>("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTutorUnlocked, setIsTutorUnlocked] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const tutorRef = useRef<HTMLDivElement>(null);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-MX";
      utterance.rate = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const q = query(collection(db, "knowledge_base"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const topics = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          fileName: doc.data().fileName
        }));
        setAvailableTopics(topics);
        if (topics.length > 0) setSelectedTopic(topics[0].id);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        fetchTopics();
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (isTutorUnlocked && tutorRef.current) {
      tutorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isTutorUnlocked]);

  const handleGenerateCourse = async () => {
    if (!selectedProfile || !selectedTopic) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch("/api/generate-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          profile: selectedProfile, 
          topic: selectedTopic,
          learningStyle,
          interestReason
        }),
      });
      const data = await res.json();
      if (data.slides) {
        setSlides(data.slides);
      }
    } catch (e) {
      console.error(e);
      alert("Error al generar el curso.");
    } finally {
      setIsGenerating(false);
    }
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      setIsTutorUnlocked(true);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 font-medium">Cargando...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 font-sans selection:bg-purple-200 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-14 flex items-center justify-center">
              <Image src="/inap-logo.png" alt="Logo INAP" fill className="object-contain" priority />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight hidden sm:block">Sustentabilidad en la Administración</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Academia Inteligente INAP</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="hidden sm:inline-block text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-200 transition-colors border border-purple-200"
            >
              Acceso Profesores
            </Link>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <span className="font-medium hidden sm:inline-block">{user.displayName || user.email}</span>
              <button 
                onClick={handleLogout}
                className="text-xs text-gray-500 hover:text-red-600 underline"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        
        {slides.length === 0 ? (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden fade-in-up p-8 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Diseña tu Aprendizaje</h2>
            <p className="text-gray-600 mb-8">
              La IA generará un curso a la medida, combinando el tema de tu elección con un lenguaje adaptado a tu trabajo diario.
            </p>
            
            <div className="space-y-6 text-left">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">1. Selecciona el Módulo Temático:</label>
                {availableTopics.length === 0 ? (
                  <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    No hay documentos disponibles. Entra a /admin para subir un PDF.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {availableTopics.map(topic => (
                      <label key={topic.id} className={`border p-4 rounded-xl cursor-pointer transition-all ${selectedTopic === topic.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                        <input type="radio" name="topic" value={topic.id} checked={selectedTopic === topic.id} onChange={(e) => setSelectedTopic(e.target.value)} className="hidden" />
                        <div className="font-bold text-gray-900">📄 {topic.title}</div>
                        <div className="text-sm text-gray-500 mt-1 text-xs">{topic.fileName}</div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">2. ¿Cuál es tu cargo o profesión actual?</label>
                <input 
                  type="text"
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  placeholder="Ej. Abogado, Titular de Finanzas, Estudiante..."
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-black mb-4"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">3. ¿Por qué te interesa aprender de sustentabilidad?</label>
                <input 
                  type="text"
                  value={interestReason}
                  onChange={(e) => setInterestReason(e.target.value)}
                  placeholder="Ej. Para resolver un problema en mi oficina, por curiosidad..."
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-black mb-4"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">4. Estilo de Aprendizaje</label>
                <select 
                  value={learningStyle}
                  onChange={(e) => setLearningStyle(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-black"
                >
                  <option value="Teórico">Teórico (Leyes y Normas)</option>
                  <option value="Práctico">Práctico (Casos y Resolución)</option>
                  <option value="Ejecutivo">Ejecutivo (Resúmenes Rápidos)</option>
                </select>
              </div>
              
              <button
                onClick={handleGenerateCourse}
                disabled={!selectedProfile || isGenerating}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 font-bold mt-4"
              >
                {isGenerating ? "Generando Slides Agenticas..." : "Generar Mi Curso"}
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden fade-in-up">
              <div className="p-10 min-h-[300px] flex flex-col justify-center text-center relative">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest absolute top-6 left-6">
                  {selectedProfile}
                </div>
                <div className="text-sm font-bold text-purple-600 absolute top-6 right-6">
                  {currentSlideIndex + 1} / {slides.length}
                </div>
                
                <div className="text-6xl mb-6">{slides[currentSlideIndex].icon}</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{slides[currentSlideIndex].title}</h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                  {slides[currentSlideIndex].content}
                </p>

                <div className="flex flex-col items-center mt-4">
                  <button 
                    onClick={() => speakText(slides[currentSlideIndex].content)}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium bg-purple-50 px-4 py-2 rounded-full mb-4"
                  >
                    <span>🔊 Escuchar Slide</span>
                  </button>
                  <Orb isSpeaking={isSpeaking} />
                </div>
              </div>
              
              <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-between items-center">
                <button 
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="px-6 py-2 rounded font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                >
                  Atrás
                </button>
                <button 
                  onClick={nextSlide}
                  className="px-6 py-2 rounded font-bold text-white bg-purple-700 hover:bg-purple-800"
                >
                  {currentSlideIndex === slides.length - 1 ? "Ir a Evaluación" : "Siguiente"}
                </button>
              </div>
            </section>

            <section 
              ref={tutorRef}
              className={`transition-all duration-1000 ease-in-out ${
                isTutorUnlocked 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 h-0 overflow-hidden pointer-events-none translate-y-10"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">Evaluación Agentiva</h3>
                  <p className="text-gray-600">Demuestra tu comprensión platicando con el Tutor Inteligente.</p>
                </div>
                <div className="h-[500px]">
                  <ChatTutor 
                    moduleName="Sustentabilidad" 
                    slidesContext={JSON.stringify(slides)}
                    onUnlock={() => setCourseCompleted(true)} 
                  />
                </div>
                {courseCompleted && (
                  <div className="bg-green-600 text-white p-6 text-center transition-all duration-500">
                    <h3 className="text-xl font-bold mb-1">¡Módulo Acreditado!</h3>
                    <p className="text-green-100 text-sm">
                      Has demostrado comprensión satisfactoria de los conceptos personalizados para tu perfil.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
