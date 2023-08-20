import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import axios from "axios";
import "../Styles/AddProduct.scss";

function AddProduct() {
  const [formInput, setFormInput] = useState({
    sku: "",
    name: "",
    price: "",
    type: "DVD",
    size: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const URL = "/api/products";

  function handleInputChange({ target: { name, value, inputMode } }) {
    // Filter out spaces for all input types
    if (value.includes(" ")) {
      return;
    }

    // If value is empty, set invalid message
    if (value === "") {
      setErrors((prev) => ({ ...prev, [name]: `${name} is empty` }));
    }

    // If input is decimal, filter out invalid characters
    if (inputMode === "decimal") {
      // Remove all non-numeric and non-decimal characters
      let sanitizedValue = value.replace(/[^0-9.]/g, "");

      const decimalIndex = sanitizedValue.indexOf(".");
      // Ensure no decimal point is set at the beginning
      if (decimalIndex === 0) {
        sanitizedValue = sanitizedValue.replace(/\./, "");
      }
      // Ensure only one decimal point exists
      if (decimalIndex !== -1) {
        sanitizedValue =
          sanitizedValue.substring(0, decimalIndex + 1) +
          sanitizedValue.substring(decimalIndex + 1).replace(/\./g, "");
      }
      value = sanitizedValue;
    }

    // Set value
    setFormInput((prev) => ({ ...prev, [name]: value }));

    // reset invalid message if value is no longer empty
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleTypeChange(e) {
    const type = e.target.value;
    console.log(type);
    // Change formInput properties according to the type of product
    switch (type) {
      case "Furniture":
        setFormInput(({ sku, name, price }) => {
          return {
            sku,
            name,
            price,
            type: type,
            height: "",
            width: "",
            length: "",
          };
        });
        break;
      case "Book":
        setFormInput(({ sku, name, price }) => {
          return {
            sku,
            name,
            price,
            type: type,
            weight: "",
          };
        });
        break;

      default:
        setFormInput(({ sku, name, price }) => {
          return {
            sku,
            name,
            price,
            type: type,
            size: "",
          };
        });
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Check if any of the formInput properties is empty
    const emptyInputKeys = Object.keys(formInput).filter(
      (key) => formInput[key] === ""
    );

    if (emptyInputKeys.length > 0) {
      // If any property is empty, set the errors state
      const newErrors = {};
      emptyInputKeys.forEach((key) => {
        newErrors[key] = `${key} is empty`;
      });

      // Show form message for a period
      setErrors(() => ({
        ...newErrors,
        formMessage: "Please, submit required data",
      }));
      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          formMessage: undefined,
        }));
      }, 3000);
    } else {
      // If all properties are filled, perform the POST request
      try {
        await axios.post(URL, formInput);
        navigate("/");
      } catch (error) {
        if (error.response?.data) {
          console.log(error.response.data);
        } else {
          console.log(`Error: ${error}, Error Message: ${error.message}`);
        }
      }
    }
  }

  return (
    <div className="add-products-container">
      <Navbar title="Add Product">
        <Button
          element={"input"}
          type="submit"
          id="save-product-btn"
          className="save-btn btn-success"
          value="SAVE"
          form="product_form"
        />
        <Button to="/" className="cancel-btn btn-danger" value={"CANCEL"} />
      </Navbar>

      <form id="product_form" className="product-form" onSubmit={handleSubmit}>
        {errors.formMessage && (
          <p className="invalid-message form-message">{errors.formMessage}</p>
        )}
        <div className="input-container">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            className={errors.sku ? "invalid" : ""}
            maxLength="11"
            value={formInput.sku}
            onChange={handleInputChange}
          />
          {errors.sku && <p className="invalid-message">{errors.sku}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className={errors.name ? "invalid" : ""}
            maxLength="11"
            value={formInput.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="invalid-message">{errors.name}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="price">Price ($)</label>
          <input
            type="text"
            name="price"
            id="price"
            className={errors.price ? "invalid" : ""}
            inputMode="decimal"
            value={formInput.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="invalid-message">{errors.price}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="productType">Type Switcher</label>
          <select
            name="product-type"
            id="productType"
            value={formInput.type}
            onChange={handleTypeChange}
          >
            <option value="DVD" id="DVD">
              DVD
            </option>
            <option value="Furniture" id="Furniture">
              Furniture
            </option>
            <option value="Book" id="Book">
              Book
            </option>
          </select>
        </div>
        {"size" in formInput && (
          <>
            <p className="dynamic-message">Please provide a size</p>
            <div className="input-container">
              <label htmlFor="size">Size (MB)</label>
              <input
                type="text"
                name="size"
                id="size"
                className={errors.size ? "invalid" : ""}
                inputMode="decimal"
                value={formInput.size}
                onChange={handleInputChange}
              />
              {errors.size && <p className="invalid-message">{errors.size}</p>}
            </div>
          </>
        )}
        {"height" in formInput && (
          <>
            <p className="dynamic-message">Please provide dimensions</p>
            <div className="input-container">
              <label htmlFor="height">Height (CM)</label>
              <input
                type="text"
                name="height"
                id="height"
                className={errors.height ? "invalid" : ""}
                inputMode="decimal"
                value={formInput.height}
                onChange={handleInputChange}
              />
              {errors.height && (
                <p className="invalid-message">{errors.height}</p>
              )}
            </div>
          </>
        )}
        {"width" in formInput && (
          <div className="input-container">
            <label htmlFor="width">Width (CM)</label>
            <input
              type="text"
              name="width"
              id="width"
              className={errors.width ? "invalid" : ""}
              value={formInput.width}
              inputMode="decimal"
              onChange={handleInputChange}
            />
            {errors.width && <p className="invalid-message">{errors.width}</p>}
          </div>
        )}
        {"length" in formInput && (
          <div className="input-container">
            <label htmlFor="length">Length (CM)</label>
            <input
              type="number"
              name="length"
              id="length"
              className={errors.length ? "invalid" : ""}
              inputMode="decimal"
              value={formInput.length}
              onChange={handleInputChange}
            />
            {errors.length && (
              <p className="invalid-message">{errors.length}</p>
            )}
          </div>
        )}
        {"weight" in formInput && (
          <>
            <p className="dynamic-message">Please provide a weight</p>
            <div className="input-container">
              <label htmlFor="weight">Weight (KG)</label>
              <input
                type="text"
                name="weight"
                id="weight"
                className={errors.weight ? "invalid" : ""}
                inputMode="decimal"
                value={formInput.weight}
                onChange={handleInputChange}
              />
              {errors.weight && (
                <p className="invalid-message">{errors.weight}</p>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
