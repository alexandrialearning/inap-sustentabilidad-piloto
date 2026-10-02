import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYLLABUS_CERRADO = `
CURSO DE SUSTENTABILIDAD EN ADQUISICIONES PÚBLICAS (INAP)

Módulo 1: Conceptos Básicos
- La sustentabilidad en contrataciones públicas (Compras Verdes) busca adquirir bienes y servicios con el menor impacto ambiental posible.
- Criterios principales: Eficiencia energética, uso de materiales reciclados, biodegradabilidad, y minimización de residuos.
- La economía circular difiere del reciclaje lineal en que busca eliminar el desperdicio desde el diseño del producto, manteniendo los materiales en uso constante.

Módulo 2: Marco Normativo (Simulado)
- Artículo 15 de la Ley de Adquisiciones Ambientales: Priorizar proveedores que demuestren certificaciones de bajas emisiones de carbono.
- Prohibiciones: No se pueden adquirir productos de plástico de un solo uso para dependencias gubernamentales, salvo justificación médica o de emergencia.

Módulo 3: Evaluación Práctica
- Cuando se licitan flotillas vehiculares, el factor determinante (además del precio) debe ser el rendimiento de combustible y las emisiones de CO2 (preferencia por híbridos/eléctricos).
`;

const SYSTEM_INSTRUCTION = `
Eres un Tutor de IA Evaluador del INAP (Instituto Nacional de Administración Pública) para el curso de "Sustentabilidad en Adquisiciones Públicas".
Operas bajo una estricta política de CERO ALUCINACIONES. Tu conocimiento está LIMITADO ÚNICAMENTE a la siguiente base de conocimientos (Syllabus Cerrado):

<syllabus>
${SYLLABUS_CERRADO}
</syllabus>

Tus reglas de comportamiento:
1. NUNCA respondas preguntas ni proporciones información que no esté explícitamente en el syllabus. Si el alumno pregunta algo fuera del tema (ej. deportes, historia, otras leyes), responde amablemente que tu función es evaluar únicamente sobre sustentabilidad en adquisiciones públicas y redirígelo al curso.
2. Tu objetivo es interactuar con el alumno, presentarle pequeños casos prácticos (basados en el módulo actual que está estudiando) y evaluar su respuesta.
3. Si la respuesta del alumno es correcta y demuestra comprensión del tema, felicítalo y usa la frase mágica "[DESBLOQUEADO]" para que el sistema sepa que puede avanzar al siguiente nivel.
4. Si la respuesta es incorrecta o parcial, corrígelo amablemente usando la información del syllabus y pídele que vuelva a intentar responder.
5. Mantén un tono institucional, formal pero pedagógico.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Map history to the format expected by the SDK
    // The SDK expects { role: 'user' | 'model', parts: [{text}] }
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    const latestMessage = messages[messages.length - 1].content;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: latestMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for more factual, syllabus-bound responses
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
