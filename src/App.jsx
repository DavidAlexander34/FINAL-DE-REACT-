import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Inicio from "./pages/Inicio/Inicio";
import Escenario from "./pages/Escenario/Escenario";
import Productos from "./pages/Catalogo/Productos";
import Contacto from "./pages/Contacto/Contacto";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/escenario" element={<Escenario />} />
                <Route path="/catalogo" element={<Productos />} />
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;