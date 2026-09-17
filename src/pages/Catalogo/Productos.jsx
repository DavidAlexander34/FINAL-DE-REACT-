import { useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Send, Trash2 } from "lucide-react";
import { useGames } from "../../hooks/useGames";
import GameCard from "../../components/Catalogo/GameCard";
import { useCart } from "../../context/CartContext";

const ITEMS_PER_PAGE = 8;
const formatCurrency = (val) => `$${val.toLocaleString("es-CO")} COP`;

export const Productos = () => {
  const { games = [], loading, error } = useGames();
  const [selectedGame, setSelectedGame] = useState(null);
  const [page, setPage] = useState(1);

  const cartCtx = useCart();
  const { cart, orderMessage, obtenerPrecio, handleAddToCart, handleRemoveFromCart, updateQuantity, handleSendCart, subtotal, iva, total } = cartCtx;

  const totalPages = Math.max(1, Math.ceil(games.length / ITEMS_PER_PAGE));
  const visibleGames = games.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading || error) {
    return (
      <div className={`mx-auto max-w-7xl px-4 py-16 text-center font-semibold ${error ? "text-rose-600" : "text-slate-600 dark:text-slate-300"}`}>
        {error ? `Error: ${error}` : "Cargando catálogo..."}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 transition-colors dark:bg-slate-950 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        
        {/* CATÁLOGO */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Colección Pokémon</p>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Productos disponibles</h1>
            </div>
            <span className="hidden rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-400 sm:inline">
              {games.length} figuras
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {visibleGames.map((game) => (
              <GameCard
                key={game.id}
                game={{ ...game, price: obtenerPrecio(game) }}
                onSelect={setSelectedGame}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" disabled={page === 1} onClick={() => setPage((c) => c - 1)} className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <ChevronLeft size={16} /> Anterior
            </button>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Página {page} de {totalPages}</span>
            <button type="button" disabled={page === totalPages} onClick={() => setPage((c) => c + 1)} className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* BARRA LATERAL */}
        <aside className="space-y-6">
          {/* DETALLE */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-lg font-black text-slate-900 dark:text-white">Detalle del producto</h2>
            {selectedGame ? (
              <div className="space-y-4">
                <div className="flex h-52 items-center justify-center rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                  <img src={selectedGame.background_image} alt={selectedGame.name} className="h-full w-full object-contain" />
                </div>
                <h3 className="text-xl font-black capitalize text-sky-700 dark:text-sky-300">{selectedGame.name}</h3>
                <dl className="space-y-2 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/70">
                  <DetailRow label="Precio" value={formatCurrency(obtenerPrecio(selectedGame))} bold />
                  <DetailRow label="Peso / Power" value={selectedGame.weight || selectedGame.rating || "10.0"} />
                  <DetailRow label="Experiencia" value={selectedGame.base_experience || selectedGame.metacritic || "100 XP"} />
                  <DetailRow label="Tipo" value={selectedGame.released || "Normal"} capitalize />
                </dl>
                <button type="button" onClick={() => setSelectedGame(null)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  Cerrar detalle
                </button>
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">Selecciona un producto para consultar sus detalles.</p>
            )}
          </section>

          {/* CARRITO */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Carrito</h2>
              <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                {cart.reduce((sum, item) => sum + (item.cantidad || 1), 0)} unidades
              </span>
            </div>

            {cart.length === 0 ? (
              <p className="py-4 text-sm text-slate-500 dark:text-slate-400">El carrito está vacío.</p>
            ) : (
              <div className="space-y-4">
                <ul className="max-h-96 space-y-4 overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const price = item.precioCalculado || obtenerPrecio(item);
                    const qty = item.cantidad || 1;
                    return (
                      <li key={item.id} className="flex gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
                        <img src={item.background_image} alt={item.name} className="h-16 w-16 rounded-lg bg-slate-100 object-contain dark:bg-slate-800" />
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-2">
                            <div>
                              <p className="truncate text-sm font-bold capitalize text-slate-800 dark:text-slate-100">{item.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{item.released || "Figura Pokémon"}</p>
                            </div>
                            <button type="button" onClick={() => handleRemoveFromCart(item.id)} className="text-slate-400 hover:text-rose-500" aria-label={`Eliminar ${item.name}`}>
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700">
                              <button type="button" onClick={() => updateQuantity(item.id, -1)} className="p-1.5 text-slate-500 hover:text-sky-600" aria-label="Disminuir cantidad"><Minus size={14} /></button>
                              <span className="w-7 text-center text-sm font-bold">{qty}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)} className="p-1.5 text-slate-500 hover:text-sky-600" aria-label="Aumentar cantidad"><Plus size={14} /></button>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500">Unitario: {formatCurrency(price)}</p>
                              <p className="text-sm font-black text-slate-900 dark:text-white">{formatCurrency(price * qty)}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <dl className="space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
                  <CartSummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
                  <CartSummaryRow label="IVA (19%)" value={formatCurrency(iva)} />
                  <CartSummaryRow label="Total a pagar" value={formatCurrency(total)} total />
                </dl>

                <button type="button" onClick={handleSendCart} className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-black text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-700">
                  <Send size={17} /> Enviar Pedido
                </button>
              </div>
            )}

            {orderMessage && (
              <p className={`mt-4 rounded-lg p-3 text-center text-sm font-bold ${orderMessage.type === "success" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"}`}>
                {orderMessage.text}
              </p>
            )}
          </section>
        </aside>

      </div>
    </main>
  );
};

/* Componentes de apoyo para reducir repetitividad */
const DetailRow = ({ label, value, bold, capitalize }) => (
  <div className="flex justify-between">
    <dt className="text-slate-500">{label}</dt>
    <dd className={`${bold ? "font-bold" : ""} ${capitalize ? "capitalize" : ""}`}>{value}</dd>
  </div>
);

const CartSummaryRow = ({ label, value, total }) => (
  <div className={`flex justify-between ${total ? "text-base font-black text-slate-900 dark:text-white" : "text-slate-500"}`}>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
);

export default Productos;