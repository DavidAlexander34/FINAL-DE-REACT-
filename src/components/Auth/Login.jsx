import { useState } from "react";
import { LogIn, LogOut, UserRound, X } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { user, login, logout } = useAuth();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!login(usuario, clave)) return;
    Swal.fire({
      icon: "success",
      title: "¡Inicio de sesión exitoso!",
      text: `Bienvenido, ${usuario.trim()}`,
      confirmButtonColor: "#0284c7",
    });
    setMostrarFormulario(false);
    setUsuario("");
    setClave("");
  }


function cerrarSesion() {
  Swal.fire({
    icon: "warning",
    title: "¿Deseas cerrar tu sesión?",
    text: "Tendrás que iniciar sesión nuevamente.",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#0284c7",
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      logout();
      setMostrarPerfil(false);

      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente.",
        confirmButtonColor: "#0284c7",
      });
    }
  });
}

  if (user) {
    return (
      <div className="relative">
        <button type="button" onClick={() => setMostrarPerfil((visible) => !visible)} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20" aria-label="Abrir perfil">
          <UserRound size={19} />
          <span className="hidden text-sm font-semibold sm:inline">{user.username}</span>
        </button>
        {mostrarPerfil && (
          <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3 dark:border-slate-700">
              <div className="rounded-full bg-sky-100 p-2 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300"><UserRound size={20} /></div>
              <div><p className="font-bold">{user.username}</p><p className="text-xs text-slate-500 dark:text-slate-400">{user.role}</p></div>
            </div>
            <button type="button" onClick={cerrarSesion} className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white hover:bg-rose-700"><LogOut size={16} />Cerrar Sesión</button>
          </div>
        )}
      </div>
    );
  }

  if (!mostrarFormulario) {
    return (
      <button className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-rose-950/20 transition hover:bg-rose-500" onClick={() => setMostrarFormulario(true)}>
        <LogIn size={17} /> Login
      </button>
    );
  }

  return (
    <form className="absolute right-4 top-20 z-50 flex w-72 flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" onSubmit={manejarEnvio}>
      <div className="flex items-center justify-between"><h2 className="font-bold">Iniciar sesión</h2><button type="button" onClick={() => setMostrarFormulario(false)} aria-label="Cerrar login"><X size={18} /></button></div>
      <input
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-800"
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />
      <input
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-800"
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        required
      />
      <button className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-bold text-white hover:bg-sky-700" type="submit">Entrar</button>
      <button className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200" type="button" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
    </form>
  );
}

export default Login;