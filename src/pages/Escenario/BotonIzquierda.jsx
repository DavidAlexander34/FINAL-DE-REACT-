function BotonIzquierda({ mover }) {
  return (
    <button type="button" onClick={mover} aria-label="Mover a la izquierda" className="rounded-lg bg-emerald-200 px-4 py-2 text-xl hover:bg-emerald-300 dark:bg-emerald-900 dark:hover:bg-emerald-800">
      ⬅
    </button>
  );
}

export default BotonIzquierda;