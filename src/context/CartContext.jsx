import { createContext, useContext, useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();
const CLAVE_CARRITO = "carrito";

function leerCarritoDesdeStorage() {
  try {
    const contenido = localStorage.getItem(CLAVE_CARRITO);
    if (!contenido) return [];

    const carritoGuardado = JSON.parse(contenido);
    return Array.isArray(carritoGuardado)
      ? carritoGuardado.map((item) => ({ ...item, cantidad: item.cantidad || 1 }))
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);
  const [orderMessage, setOrderMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const obtenerPrecio = (game) => {
    if (game.price) return game.price;
    const base = 20000;
    const idFactor = game.id ? game.id * 4500 : 10000;
    const weightFactor = game.weight ? game.weight * 600 : 8000;
    return base + ((idFactor + weightFactor) % 65000);
  };

  const agregarAlCarrito = useCallback((personaje) => {
    const producto = {
      id: personaje.id,
      name: personaje.name,
      image: personaje.image || personaje.background_image || personaje.sprites?.front_default,
      precio: personaje.precio ?? personaje.price ?? obtenerPrecio(personaje),
    };
    const productoCompatible = {
      ...producto,
      background_image: producto.image,
      precioCalculado: producto.precio,
    };

    setCarrito((carritoActual) => {
      const existing = carritoActual.find((item) => item.id === producto.id);
      if (existing) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
        );
      }
      return [...carritoActual, { ...productoCompatible, cantidad: 1 }];
    });
    setOrderMessage(null);
  }, []);

  const handleAddToCart = agregarAlCarrito;

  const handleRemoveFromCart = (productId) => {
    setCarrito((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCarrito((prevCart) =>
      prevCart.flatMap((item) => {
        if (item.id !== productId) return [item];
        const cantidad = (item.cantidad || 1) + amount;
        return cantidad > 0 ? [{ ...item, cantidad }] : [];
      })
    );
  };

  // Cálculos de montos
// Cálculos de montos (Precio con IVA incluido)
const total = carrito.reduce(
  (acc, item) =>
    acc + (item.precio ?? item.precioCalculado ?? obtenerPrecio(item)) * (item.cantidad || 1),
  0
);

const iva = Math.round(total * 0.19);
const subtotal = total - iva;
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Nueva función handleSendCart con SweetAlert2
  const handleSendCart = () => {
    if (carrito.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "Agrega al menos un producto antes de enviar el pedido.",
        confirmButtonColor: "#0284c7",
      });
      return;
    }

    Swal.fire({
      title: "¿Enviar pedido?",
      text: `El total de tu pedido es $${total.toLocaleString("es-CO")} COP`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar pedido",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        setCarrito([]);
        localStorage.removeItem(CLAVE_CARRITO);

        Swal.fire({
          icon: "success",
          title: "¡Pedido enviado!",
          text: "Tu pedido fue enviado correctamente.",
          confirmButtonColor: "#0284c7",
        });
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        cart: carrito,
        totalItems,
        agregarAlCarrito,
        orderMessage,
        obtenerPrecio,
        handleAddToCart,
        handleRemoveFromCart,
        updateQuantity,
        handleSendCart,
        subtotal,
        iva,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}