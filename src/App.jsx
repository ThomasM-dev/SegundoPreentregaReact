import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Faq from "./screens/Faq";
import Cart from "./screens/Cart";
import ProductCard from "./screens/ProductCard";
import CategoryPage from "./screens/CategoryPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar colorNav="white" />
      <Routes>
        <Route path="/Carrito" element={<Cart />} />
        <Route path="/Preguntas-Frecuentes" element={<Faq />} />
        <Route path="/" element={<CategoryPage />} />
        <Route path="/categoria/:category" element={<CategoryPage />} />
        <Route path="/categoria/:category/DetalleProducto/:itemId" element={<ProductCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
