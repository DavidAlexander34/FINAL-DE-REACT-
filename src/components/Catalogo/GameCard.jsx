import { Eye, ShoppingBag } from "lucide-react";

export const GameCard = ({ game, onSelect, onAddToCart }) => {
  const imageSource = game.background_image || game.sprites?.front_default;
  const gameStat = game.rating || game.weight || "10.0";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      
      {/* Contenedor de Imagen */}
      <div className="flex h-48 items-center justify-center bg-slate-100 p-5 dark:bg-slate-800">
        <img 
          src={imageSource} 
          alt={game.name} 
          className="h-full w-full object-contain" 
        />
      </div>

      {/* Información y Acciones */}
      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-1 truncate text-lg font-black capitalize text-slate-800 dark:text-slate-100">
          {game.name}
        </h2>
        
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Peso/Power: {gameStat}
        </p>

        {/* Botones */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <button 
            type="button" 
            onClick={() => onSelect(game)} 
            className="flex items-center justify-center gap-1 rounded-lg border border-slate-300 px-2 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Eye size={14} />
            Detalle
          </button>

          <button 
            type="button" 
            onClick={() => onAddToCart(game)} 
            className="flex items-center justify-center gap-1 rounded-lg bg-sky-600 px-2 py-2 text-xs font-bold text-white hover:bg-sky-700"
          >
            <ShoppingBag size={14} />
            Añadir
          </button>
        </div>
      </div>

    </article>
  );
};

export default GameCard;