import hero from "../../assets/hero.png";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../assets/vite.svg";
import reactRouter from "../../assets/react-router.svg";
import tailwindcss from "../../assets/tailwind-css.svg";

function Inicio() {
  const tecnologias = [
    {
      nombre: "React",
      descripcion: "Biblioteca para construir interfaces de usuario.",
      imagen: reactLogo,
    },
    {
      nombre: "Vite",
      descripcion: "Herramienta moderna para desarrollar aplicaciones frontend.",
      imagen: viteLogo,
    },
    {
      nombre: "Tailwind CSS",
      descripcion: "Framework CSS basado en clases de utilidad.",
      imagen: tailwindcss,
    },
    {
      nombre: "React Router",
      descripcion: "Librería para gestionar la navegación de la aplicación.",
      imagen: reactRouter,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center">
            <img src={hero} alt="React705" className="w-40 h-40 object-contain mb-8" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ¡Bienvenidos a React705!
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-slate-300 mb-8">
              Un espacio creado para aprender a desarrollar aplicaciones
              web modernas utilizando React y Vite.
            </p>
            <p className="max-w-3xl text-slate-400 mb-8">
              Durante este proyecto exploraremos componentes, navegación,
              consumo de APIs, estilos y diferentes herramientas del
              ecosistema de React.
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition duration-300">
              Comenzar a aprender
            </button>
          </div>
        </div>
      </section>

      {/* TECNOLOGÍAS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-4">
          Tecnologías utilizadas
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
          Este proyecto integra diferentes tecnologías y librerías
          utilizadas actualmente en el desarrollo frontend.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tecnologias.map((tecnologia) => (
            <div
              key={tecnologia.nombre}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 transition duration-300"
            >
              <div className="h-24 flex items-center justify-center mb-5">
                <img src={tecnologia.imagen} alt={tecnologia.nombre} className="max-h-16 max-w-full w-auto object-contain" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                {tecnologia.nombre}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {tecnologia.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* APRENDIZAJE */}
      <section className="bg-slate-100 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">
            ¿Qué aprenderemos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-slate-100">Componentes</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Aprenderemos a dividir nuestra aplicación en componentes reutilizables.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-slate-100">Navegación</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Utilizaremos React Router para crear diferentes páginas dentro de nuestra aplicación.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-slate-100">APIs</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Aprenderemos a consumir información desde servicios externos mediante APIs.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2 text-slate-800 dark:text-slate-100">Tailwind CSS</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Construiremos interfaces modernas utilizando clases de utilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-center py-8">
        <p>React705 · Aprendiendo desarrollo web moderno</p>
      </footer>
    </main>
  );
}

export default Inicio;