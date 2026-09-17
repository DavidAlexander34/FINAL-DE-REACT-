import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const estadoColores = {
  Alive: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  Dead: "bg-rose-500/15 text-rose-400 ring-rose-500/30",
  unknown: "bg-slate-500/15 text-slate-400 ring-slate-500/30",
};

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function CharacterCard({ personaje }) {
  const { agregarAlCarrito } = useCart();
  const colorEstado = estadoColores[personaje.status] || estadoColores.unknown;

  return (
    <article className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <img
          src={personaje.image}
          alt={personaje.name}
          className="w-full h-56 object-cover"
        />
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ${colorEstado}`}
        >
          {personaje.status}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-lg leading-tight">
            {personaje.name}
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
            #{personaje.id}
          </span>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-slate-500 dark:text-slate-400">
          <li>
            <span className="text-slate-400 dark:text-slate-500">Género:</span>{" "}
            {personaje.gender}
          </li>
          <li>
            <span className="text-slate-400 dark:text-slate-500">Especie:</span>{" "}
            {personaje.species}
          </li>
          <li>
            <span className="text-slate-400 dark:text-slate-500">
              Visto por primera vez:
            </span>{" "}
            {personaje.primeraAparicion}
          </li>
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">
            {formatearPrecio(personaje.precio)}
          </span>
          <button
            type="button"
            onClick={() => agregarAlCarrito(personaje)}
            className="p-2 rounded-full bg-slate-900 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-colors"
            title="Agregar al carrito"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}