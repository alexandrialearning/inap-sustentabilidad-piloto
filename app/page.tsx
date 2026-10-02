"use client";

import { useState, useRef, useEffect } from "react";
import ChatTutor from "@/components/ChatTutor";

export default function Home() {
  const [unlockedModules, setUnlockedModules] = useState<number>(1);
  const module2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unlockedModules >= 2 && module2Ref.current) {
      module2Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [unlockedModules]);

  const handleUnlockModule2 = () => {
    setUnlockedModules(2);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 font-sans selection:bg-purple-200">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-800 rounded flex items-center justify-center text-white font-bold text-xl">
              INAP
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Sustentabilidad en Adquisiciones Públicas</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Piloto Scroll_v2</p>
            </div>
          </div>
          <div className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
            Progreso: {unlockedModules}/2
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-24">
        
        {/* Module 1 */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden fade-in-up">
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-purple-900">Módulo 1: Conceptos Básicos</h2>
            <div className="prose text-gray-600">
              <p>
                La sustentabilidad en contrataciones públicas (Compras Verdes) busca adquirir bienes y servicios con el menor impacto ambiental posible.
              </p>
              <p>
                Los criterios principales incluyen la <strong>eficiencia energética</strong>, el uso de <strong>materiales reciclados</strong>, la <strong>biodegradabilidad</strong>, y la <strong>minimización de residuos</strong>.
              </p>
              <p>
                Un concepto fundamental es la <strong>economía circular</strong>, la cual difiere del reciclaje lineal tradicional en que busca eliminar el desperdicio desde el diseño mismo del producto, manteniendo los materiales en uso constante, en lugar de simplemente gestionar la basura una vez que se produce.
              </p>
            </div>
          </div>
          
          {/* Chat Tutor Evaluation for Module 1 */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Evaluación de Módulo</h3>
            <div className="h-[400px]">
              <ChatTutor 
                moduleName="Módulo 1" 
                onUnlock={handleUnlockModule2} 
              />
            </div>
          </div>
        </section>

        {/* Module 2 (Locked until Module 1 is passed) */}
        <section 
          ref={module2Ref}
          className={\`transition-all duration-1000 ease-in-out \${
            unlockedModules >= 2 
              ? "opacity-100 translate-y-0" 
              : "opacity-50 blur-sm pointer-events-none translate-y-10"
          }\`}
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-purple-900">Módulo 2: Marco Normativo</h2>
                {unlockedModules < 2 && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold uppercase flex items-center gap-1">
                    🔒 Bloqueado
                  </span>
                )}
              </div>
              
              <div className="prose text-gray-600">
                <p>
                  ¡Excelente! Has demostrado comprensión de los conceptos básicos. Ahora hablemos de la regulación.
                </p>
                <p>
                  El <strong>Artículo 15 de la Ley de Adquisiciones Ambientales</strong> establece que se debe priorizar a los proveedores que demuestren certificaciones de bajas emisiones de carbono.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-4">
                  <p className="text-orange-800 font-medium m-0">
                    Prohibición Estricta:
                  </p>
                  <p className="text-orange-700 text-sm mt-1 m-0">
                    No se pueden adquirir productos de plástico de un solo uso para dependencias gubernamentales, salvo justificación médica o de emergencia.
                  </p>
                </div>
              </div>
            </div>
            
            {/* The rest of the course would continue here... */}
            <div className="bg-purple-900 text-white p-8 text-center">
              <h3 className="text-xl font-bold mb-2">¡Felicidades! Has completado el piloto.</h3>
              <p className="text-purple-200 text-sm">
                Esta es una demostración de la arquitectura Scroll_v2 con evaluación agentiva en tiempo real.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
