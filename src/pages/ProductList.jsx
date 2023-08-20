import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import "../Styles/ProductList.scss";

function ProductList() {
  const [products, setProducts] = useState(null);
  const [selectedProductIds, setselectedProductIds] = useState([]);
  const [shouldFetchProducts, setShouldFetchProducts] = useState(false);
  const URL = "/api/products";

  useEffect(() => {
    // Creating controller to Abort fetch on component unmount
    const controller = new AbortController();
    // Fetching product list and putting it in "products"
    (async () => {
      try {
        const result = await axios.get(URL, {
          signal: controller.signal,
        });
        setProducts(() => result.data);
      } catch (error) {
        if (error.response?.data) {
          console.log(error.response.data);
        } else if (error.name !== "CanceledError") {
          console.log(`Error: ${error}, Error Message: ${error.message}`);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [shouldFetchProducts]);

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
    // Only delete when there is at least 1 id in selectedProductIds
    if (selectedProductIds.length > 0) {
      try {
        await axios.post(URL, {
          ids: selectedProductIds,
        });
        setselectedProductIds(() => []);
        setShouldFetchProducts((prev) => !prev); // Re-fetch the data after delete
      } catch (error) {
        if (error.response?.data) {
          console.log(error.response.data.ids);
        } else {
          console.log(`Error: ${error}, Error Message: ${error.message}`);
        }
      }
    }
  }

  // Setting up the list of products by looping through the "products" data and returning a product card for each object
  const productList = products?.map((product) => {
    const dynamicProperty = {};
    const isChecked = selectedProductIds.includes(product.id.toString());

    // Checking product type in order to render the right keys and values format
    if (product.type === "DVD") {
      dynamicProperty.key = "Size";
      dynamicProperty.value = product.size + " MB";
    } else if (product.type === "Book") {
      dynamicProperty.key = "Weight";
      dynamicProperty.value = product.weight + " KG";
    } else {
      dynamicProperty.key = "Dimension";
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
        isChecked={isChecked}
        onCheckBoxChange={onCheckBoxChange}
      />
    );
  });

  return (
    <div className="products-list-container">
      <Navbar title="Product List">
        <Button to="/add-product" className="add-btn btn-success" value="ADD" />
        <Button
          id="delete-product-btn"
          className="delete-btn btn-danger"
          onClick={deleteProductsByIds}
          value="MASS DELETE"
        />
      </Navbar>
      <div className="product-list">{productList}</div>
    </div>
  );
}

export default ProductList;
