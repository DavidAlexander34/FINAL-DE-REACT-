function BotonInicio({ mover }) {
  return (
    <button type="button" onClick={mover} aria-label="Volver al inicio" className="rounded-lg bg-emerald-600 px-4 py-2 text-xl text-white hover:bg-emerald-700">
      ↺
    </button>
  );
}

export default BotonInicio;