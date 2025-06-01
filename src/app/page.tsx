"use client"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-50 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">¡Bienvenido a MemoryProyect!</h1>
      <p className="max-w-2xl text-lg md:text-xl text-gray-700 mb-10">
        MemoryProyect es un juego clásico de memoria donde tu objetivo es encontrar todas las parejas de cartas iguales en el menor tiempo y con el menor número de clics posible. 🧠⏱️
      </p>
      <p className="max-w-xl text-md md:text-lg text-gray-600">
        Compite por el mejor puesto en el ranking, guarda tus partidas y demuestra que tienes la mejor memoria. ¡Buena suerte!
      </p>
    </main>
  )
}
