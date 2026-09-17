function Tortuga({ posicion }) {
  return (
    <div className="relative text-6xl transition-[left] duration-200" style={{ left: `${posicion}px` }}>
      🐢
    </div>
  );
}

export default Tortuga;