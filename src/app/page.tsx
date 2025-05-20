"use client"

import GrupoTargeta from "@/components/misComponentes/GrupoTargeta";
import Header from "@/components/misComponentes/Header";
//import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a MemoryProyect</h1>
        <p className="mb-4">¡Desafía tu memoria con nuestras tarjetas!</p>
        <GrupoTargeta />
      </main>
    </>
  );
}
