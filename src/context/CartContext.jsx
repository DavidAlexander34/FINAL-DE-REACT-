import { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
    setCarrito((prevCart) => prevCart.flatMap((item) => {
      if (item.id !== productId) return [item];
      const cantidad = (item.cantidad || 1) + amount;
      return cantidad > 0 ? [{ ...item, cantidad }] : [];
    }));
  };

  const handleSendCart = () => {
    if (carrito.length === 0) {
      setOrderMessage({ type: 'error', text: 'No puedes enviar un carrito vacío.' });
      return;
    }

    if (!window.confirm('¿Deseas confirmar y enviar este pedido?')) {
      setOrderMessage({ type: 'error', text: 'El envío del pedido fue cancelado.' });
      return;
    }

    setOrderMessage({ type: 'success', text: 'Pedido enviado con éxito.' });
    setCarrito([]);
  };

  const subtotal = carrito.reduce(
    (total, item) => total + (item.precio ?? item.precioCalculado ?? obtenerPrecio(item)) * (item.cantidad || 1),
    0
  );
  const iva = subtotal * 0.19;
  const total = subtotal + iva;
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        totalItems,
        agregarAlCarrito,
        cart: carrito,
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