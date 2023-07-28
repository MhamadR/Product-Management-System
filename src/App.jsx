import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import "./Styles/App.scss";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
