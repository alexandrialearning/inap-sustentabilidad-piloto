import React from "react";
import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-gray-200 rounded-2xl">
        
        <div className="mb-8 border-b border-gray-200 pb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900">Aviso de Privacidad</h1>
          <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
            Volver
          </Link>
        </div>

        <div className="prose max-w-none text-gray-600 space-y-6">
          <p className="font-medium text-gray-900">
            Cumplimiento consolidado bajo la LFPDPPP (México) y el GDPR (Unión Europea)
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Identidad y Domicilio del Responsable del Tratamiento</h2>
            <p>
              Alexandr.ia AI Learning Systems (en adelante, el "Responsable"), es el creador, desarrollador tecnológico y responsable del tratamiento y protección de sus datos personales dentro de la plataforma Academia Inteligente INAP. Para efectos del presente aviso, el Responsable señala como su domicilio legal el ubicado en: Paseo de la luz 232, Paseos de Taxqueña, Coyoacán, C.P. 04250, Ciudad de México, CDMX, México. Correo electrónico de contacto oficial: info@alexandriads.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Bases Jurídicas para el Tratamiento</h2>
            <p>De conformidad con el Artículo 6 del GDPR y las disposiciones aplicables de la LFPDPPP, tratamos sus datos personales bajo los siguientes fundamentos legales:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Consentimiento:</strong> Para el registro inicial, la carga de documentos de estudio (PDF), el uso voluntario de herramientas de Inteligencia Artificial basadas en sus interacciones y el envío de actualizaciones de la plataforma (finalidades secundarias).</li>
              <li><strong>Ejecución de un servicio / contrato:</strong> Para la provisión técnica, autenticación y correcto funcionamiento de la plataforma de aprendizaje agéntico para servidores públicos y usuarios de la Academia Inteligente INAP.</li>
              <li><strong>Interés legítimo:</strong> Para garantizar la seguridad informática de la infraestructura, prevención de fraudes y el proceso de disociación y anonimización de datos con fines analíticos y de mejora tecnológica.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Datos Personales Recabados y Obligaciones del Titular</h2>
            <p>Para brindar acceso y operatividad a la plataforma Academia Inteligente INAP, el Responsable tratará los siguientes datos de usuarios y servidores públicos:</p>
            <div className="space-y-4 mt-4">
              <p><strong>3.1 Datos de Identidad y Autenticación (Firebase Authentication):</strong> Se guarda exclusivamente el acceso del usuario, gestionado por Google. Incluye Correo Electrónico / Matrícula (ej. alumno@anahuac.mx), Contraseña (encriptada irreversiblemente por Firebase, inaccesible de forma legible) y UID (número de identificación único asignado por el sistema) para la verificación de cuenta y gestión segura de sesiones.</p>
              <p><strong>3.2 Base Documental y Temarios (Firestore):</strong> Cada vez que un usuario sube un archivo PDF al generador, se guarda un registro en Firestore que contiene el nombre original del archivo, una muestra en texto plano, alias del usuario que lo subió y la fecha de subida.</p>
              <p><strong>3.3 Generación de Cursos Conversacionales e Interacciones:</strong> Cada vez que un usuario interactúa con la plataforma para la generación de cursos inteligentes y conversaciones de aprendizaje adaptado, se guarda de forma estrictamente anónima la sesión con su escenario y el historial de mensajes de texto.</p>
              <p><strong>3.4 Exclusión Absoluta de Datos Sensibles:</strong> El Responsable no recaba ni trata datos personales sensibles bajo ninguna circunstancia en esta plataforma. Se solicita al usuario abstenerse de introducir este tipo de información (como datos de salud, opiniones políticas, convicciones religiosas, origen étnico o datos biométricos) en los campos de texto libre, micrófonos, o documentos PDF cargados.</p>
              <p><strong>3.5 Datos Técnicos:</strong> Direcciones IP, tokens de sesión, tipo de navegador y comportamiento técnico dentro del sitio a través de cookies.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Finalidades del Tratamiento</h2>
            <h3 className="font-bold text-gray-800 mt-4">4.1 Finalidades Primarias (Necesarias para el servicio):</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Autenticación, creación y verificación de la cuenta de acceso al laboratorio.</li>
              <li>Procesamiento de los documentos PDF cargados y de la configuración del usuario para generar cursos inteligentes personalizables y rutas de aprendizaje adaptadas.</li>
              <li>Prestación del servicio nativo de Inteligencia Artificial (evaluación socrática, procesamiento de voz a texto, procesamiento de prompts y asistencia tutorial).</li>
              <li>Generación de métricas analíticas. Para este fin, y para proteger su privacidad, las conversaciones del chat, audio y datos de uso se someten a un proceso estricto de disociación para separarlos y desvincularlos por completo de la identidad y nombre del usuario, garantizando su total anonimato.</li>
              <li>Soporte técnico, administración interna y mantenimiento de la seguridad de la infraestructura.</li>
            </ul>

            <h3 className="font-bold text-gray-800 mt-6">4.2 Finalidades Secundarias:</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Conservación y análisis histórico de interacciones para el entrenamiento y optimización continua de los algoritmos de procesamiento de lenguaje natural y motores generativos.</li>
              <li>Envío de correos electrónicos informativos sobre actualizaciones tecnológicas o nuevas funciones pedagógicas.</li>
            </ul>

            <h3 className="font-bold text-gray-800 mt-6">4.3 Oposición:</h3>
            <p className="mt-2">Si no desea que sus datos personales sean tratados para alguna o todas las finalidades secundarias, o bien, desea ejercer cualquiera de sus Derechos ARCO o prerrogativas de privacidad, puede manifestarlo enviando un correo electrónico a privacidad@inap.org.mx. Bajo el GDPR, retirar su consentimiento para estas finalidades no afectará la licitud del tratamiento efectuado previamente.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Decisiones Automatizadas e Inteligencia Artificial</h2>
            <p>Las interacciones en Academia Inteligente INAP son procesadas de manera automatizada por modelos fundacionales de lenguaje natural para estructurar cursos inteligentes, analizar documentos de estudio y personalizar la experiencia conversacional y pedagógica del usuario. Estas soluciones automatizadas no producen efectos jurídicos significativos ni afectan de forma adversa al Titular en los términos del Artículo 22 del GDPR, limitándose estrictamente a ser herramientas de asistencia académica, aprendizaje adaptado y formación continua.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Transferencias Internacionales de Datos</h2>
            <p>El Responsable utiliza infraestructura en la nube de grado empresarial (como Google Cloud Platform, Firebase y APIs de Inteligencia Artificial Generativa) cuyos servidores pueden estar ubicados fuera de México o del Espacio Económico Europeo (EEE), principalmente en Estados Unidos.</p>
            <p className="mt-2">Para cumplir con el GDPR, estas transferencias internacionales se respaldan mediante Cláusulas Contractuales Tipo (Standard Contractual Clauses - SCCs) aprobadas por la Comisión Europea. Cualquier reporte compartido con la institución académica o aliados se entregará exclusivamente en formatos estadísticos e irreversiblemente anonimizados.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Plazos de Conservación y Proceso de Anonimización</h2>
            <p>Los datos identificables del Titular (nombre y correo) se conservarán únicamente mientras la cuenta de la plataforma permanezca activa o durante los plazos estrictamente obligatorios para la atención de responsabilidades jurídicas.</p>
            <p className="mt-2">Para los fines de analítica a largo plazo, investigación educativa y optimización de los algoritmos del producto (Learning Analytics), los datos de uso, documentos subidos, prompts e interacciones del chat pasarán por un proceso irreversible de disociación y anonimización. Es decir, el contenido de sus conversaciones con la IA siempre se separa permanentemente de sus datos de identidad (nombre o correo). Al perder de forma permanente cualquier vínculo con una persona física identificada o identificable, estos datos dejan de ser considerados "datos personales" ante la ley y podrán ser conservados de manera indefinida con fines estadísticos y de desarrollo tecnológico.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Derechos del Titular (Derechos ARCO y Derechos GDPR)</h2>
            <p>El Titular puede ejercer sus derechos de protección de datos enviando una solicitud formal a info@alexandriads.com. Sus derechos consolidados comprenden:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Acceso:</strong> Conocer qué datos personales tratamos y sus condiciones de uso.</li>
              <li><strong>Rectificación:</strong> Solicitar la corrección de información inexacta o incompleta.</li>
              <li><strong>Cancelación / Supresión:</strong> Solicitar el borrado total de sus datos cuando no sean necesarios o se retire el consentimiento.</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos para las finalidades secundarias.</li>
              <li><strong>Limitación del Tratamiento:</strong> Solicitar la suspensión temporal del tratamiento de sus datos bajo supuestos específicos del GDPR.</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos personales en un formato estructurado y de lectura mecánica para transferirlos a otra entidad (GDPR).</li>
            </ul>
            <p className="mt-4">Para dar trámite a su solicitud, deberá acreditar su identidad mediante copia de una identificación oficial vigente u otro mecanismo de verificación equivalente. El Responsable resolverá en un plazo máximo de 20 días hábiles (México) o 1 mes (Unión Europea) según resulte aplicable.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Medidas de Seguridad y Notificación de Brechas</h2>
            <p>El Responsable mantiene estrictas medidas de seguridad técnicas, físicas y administrativas. En caso de ocurrir una vulneración de seguridad que represente un alto riesgo para los derechos de los usuarios, el Responsable notificará la brecha a los Titulares y a las autoridades competentes en un plazo máximo de 72 horas tras tener conocimiento de ella, en apego al estándar del GDPR.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Autoridades Garantes</h2>
            <p>Si el Titular considera que su derecho a la privacidad ha sido vulnerado, tiene a su disposición interponer una reclamación ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) en México, o ante la Autoridad de Control local correspondiente en su país de residencia dentro de la Unión Europea.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">11. Cambios al Aviso de Privacidad</h2>
            <p>Este aviso puede modificarse debido a nuevos requerimientos legales, cambios operacionales en Academia Inteligente INAP o actualizaciones de los modelos de IA subyacentes. Las versiones vigentes estarán siempre disponibles para consulta en el portal web.</p>
            <p className="mt-4 text-sm text-gray-500 italic">Última actualización: Septiembre 2026.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
