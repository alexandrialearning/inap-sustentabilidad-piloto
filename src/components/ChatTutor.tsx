"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatTutorProps {
  moduleName: string;
  slidesContext?: string;
  onUnlock: () => void;
}

export default function ChatTutor({ moduleName, slidesContext, onUnlock }: ChatTutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hola. Soy tu tutor para el ${moduleName}. Para acreditar el módulo, por favor explícame con tus palabras los conceptos más importantes que acabas de leer.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          messages: newMessages,
          context: slidesContext
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        let reply = data.reply;
        const isUnlocked = reply.includes("[DESBLOQUEADO]");
        
        if (isUnlocked) {
          reply = reply.replace("[DESBLOQUEADO]", "").trim();
        }

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

        if (isUnlocked) {
          setTimeout(() => {
            onUnlock();
          }, 1500);
        }
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Hubo un error de conexión con el tutor. Por favor, intenta de nuevo." }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-purple-800 text-white p-3 font-semibold text-center">
        Tutor INAP - {moduleName}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto max-h-[300px] bg-gray-50 flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg text-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end rounded-br-none"
                : "bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none shadow-sm"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 text-xs italic self-start bg-white p-2 rounded-lg border border-gray-100">
            El tutor está evaluando...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu respuesta..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 disabled:opacity-50 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
