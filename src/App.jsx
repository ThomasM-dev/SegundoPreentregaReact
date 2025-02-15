import Catologist from "./screens/Catologist";
import Faq from "./screens/Faq";
import Cart from "./screens/Cart";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import ProductCard from "./screens/ProductCard";
import CategoryPage from "./screens/CategoryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar colorNav="white" />
        <Routes>
          <Route path="/Carrito" element={<Cart />} />
          <Route path="/" element={<Catologist />} />
          <Route path="/Preguntas-Frecuentes" element={<Faq />} />
          <Route path="/DetalleProducto/:itemId" element={<ProductCard />} />
          <Route path="/categoria/:category" element={<CategoryPage />} /> {/* Ruta para categorías */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
