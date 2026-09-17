import ContactoForm from "./ContactoForm";

function Contacto() {
  return (
    <section className="min-h-screen bg-slate-100 py-12 px-4 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 dark:text-slate-100">
            Contáctame
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto dark:text-slate-300">
            ¿Tienes alguna pregunta, sugerencia o deseas comunicarte conmigo?
            Completa el siguiente formulario y recibiré tu mensaje directamente
            en mi correo electrónico.
          </p>
        </div>

        {/* Formulario */}
        <ContactoForm />
      </div>
    </section>
  );
}

export default Contacto;