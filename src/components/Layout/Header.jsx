import { Link } from "react-router-dom";
import { Moon, ShoppingCart, Sun } from "lucide-react";
import Navbar from "./Navbar";
import Login from "../Auth/Login";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";

function Header() {
  const { tema, cambiarTema } = useTheme();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 border-b border-rose-500/30 bg-slate-950/95 px-4 py-3 text-white shadow-lg backdrop-blur md:px-8">
      <div>
        <Link to="/">
          <span className="text-xl font-black tracking-tight text-white">FIGURAS DE POKEMON</span>
        </Link>
      </div>

      <Navbar />

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full border border-white/20 bg-white/10 p-2 hover:bg-white/20"
          onClick={cambiarTema}
          aria-label="Cambiar tema"
        >
          {tema === "claro" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <Link to="/catalogo" className="relative flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20" aria-label="Carrito de compras">
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-rose-600 px-1.5 py-0.5 text-center text-xs leading-4 text-white">{totalItems}</span>}
        </Link>

        <div>
          <Login />
        </div>
      </div>
    </header>
  );
}

export default Header;

