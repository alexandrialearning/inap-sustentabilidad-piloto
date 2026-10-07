import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academia Inteligente INAP",
  description: "Plataforma de profesionalización y aprendizaje continuo impulsada por Inteligencia Artificial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
