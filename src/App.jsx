import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Faq from "./screens/Faq";
import Cart from "./screens/Cart";
import ProductCard from "./screens/ProductCard";
import CategoryPage from "./screens/CategoryPage";
import Error404 from "./screens/Error404";
import Checkout from "./screens/Checkout";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductsContext";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar colorNav="white" />
          <Routes>
            <Route path="/Carrito" element={<Cart />} />
            <Route path="/Preguntas-Frecuentes" element={<Faq />} />
            <Route path="/" element={<CategoryPage />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            <Route
              path="/categoria/:category/DetalleProducto/:itemId"
              element={<ProductCard />}
            />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
