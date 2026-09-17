import { useState, useEffect } from "react";
import Tortuga from "./Tortuga";
import BotonDerecha from "./BotonDerecha";
import BotonIzquierda from "./BotonIzquierda";
import BotonInicio from "./BotonInicio";

const LIMITE_IZQ = -230;
const LIMITE_DER = 230;
const PASO = 10;

function Escenario() {
  const [posicion, setPosicion] = useState(0);

  const moverDerecha = () => setPosicion((prev) => Math.min(prev + PASO, LIMITE_DER));
  const moverIzquierda = () => setPosicion((prev) => Math.max(prev - PASO, LIMITE_IZQ));
  const moverInicio = () => setPosicion(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") moverDerecha();
      if (event.key === "ArrowLeft") moverIzquierda();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-emerald-50 px-4 py-12 transition-colors dark:bg-slate-950">
      <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-emerald-300 bg-white/80 p-8 text-center shadow-xl shadow-emerald-900/10 backdrop-blur dark:border-emerald-900 dark:bg-slate-900/80">
        <h1 className="mb-8 text-3xl font-black text-emerald-800 dark:text-emerald-300">Carrera de la Tortuga</h1>
        <div className="flex h-28 w-full items-center overflow-hidden rounded-xl border border-dashed border-emerald-400 bg-emerald-100 px-4 dark:border-emerald-700 dark:bg-emerald-950/60"><Tortuga posicion={posicion} /></div>
        <div className="mt-6 flex items-center gap-3"><BotonIzquierda mover={moverIzquierda} /><BotonInicio mover={moverInicio} /><BotonDerecha mover={moverDerecha} /></div>
        <p className="mt-5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">Posición de Tortuguín: <span>{posicion}px</span></p>
      </div>
    </main>
  );
}

export default Escenario;
