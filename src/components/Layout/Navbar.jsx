import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-3 text-sm font-semibold text-slate-300">

        <li>
          <Link className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white" to="/escenario">
            Diviértete
          </Link>
        </li>

        <li>
          <Link className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white" to="/catalogo">
            Catálogo
          </Link>
        </li>

        <li>
          <Link className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white" to="/contacto">
            Contáctame
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;

