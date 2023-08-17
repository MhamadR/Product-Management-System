import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import "../Styles/ProductList.scss";

function ProductList() {
  const [products, setProducts] = useState(null);
  const [selectedProductIds, setselectedProductIds] = useState([]);
  const URL = "/api/products";

  useEffect(() => {
    // Creating controller to Abort fetch on component unmount
    const controller = new AbortController();
    // Fetching product list and putting it in "products"
    const fetchData = async () => {
      try {
        const result = await axios.get(URL, {
          signal: controller.signal,
        });
        setProducts(() => result.data);
      } catch (e) {
        console.log(
          `Error Fetching Products: ${e}, Error Message: ${e.message}`
        );
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  function onCheckBoxChange(e) {
    const isChecked = e.target.checked;
    const id = e.target.id;
    // When a checkbox is selected on a product, add the product id to the "selectedProductIds" array
    if (isChecked) {
      setselectedProductIds((prev) => [...prev, id]);
    } else {
      // When a checkbox is unselected on a product, remove the product id from the "selectedProductIds" array
      setselectedProductIds((prev) => prev.filter((prevId) => prevId !== id));
    }
  }

  async function deleteProductsByIds() {
    try {
      await axios.post(URL, {
        ids: selectedProductIds,
      });
      setselectedProductIds(() => []);
    } catch (error) {
      console.log(`Error: ${error}, Error Message: ${error.message}`);
    }
  }

  console.log(selectedProductIds);

  // Setting up the list of products by looping through the "products" data and returning a product card for each object
  const productList = products?.map((product) => {
    const dynamicProperty = {};

    // Checking product type in order to render the right keys and values format
    if (product.type === "DVD") {
      dynamicProperty.key = "Size";
      dynamicProperty.value = product.size + " $";
    } else if (product.type === "Book") {
      dynamicProperty.key = "Weight";
      dynamicProperty.value = product.weight + " KG";
    } else {
      dynamicProperty.key = "Furniture";
      dynamicProperty.value = `${product.height}x${product.width}x${product.length}`;
    }

    return (
      <ProductCard
        key={product.id}
        id={product.id}
        sku={product.sku}
        name={product.name}
        price={product.price}
        property={dynamicProperty.key}
        value={dynamicProperty.value}
        onCheckBoxChange={onCheckBoxChange}
      />
    );
  });

  return (
    <div className="products-list-container">
      <Navbar title="Product List">
        <Link to="/add-product" className="add-btn">
          ADD
        </Link>
        <button
          id="delete-product-btn"
          className="delete-btn"
          onClick={deleteProductsByIds}
        >
          MASS DELETE
        </button>
      </Navbar>
      <div className="product-list">{productList}</div>
    </div>
  );
}

export default ProductList;
