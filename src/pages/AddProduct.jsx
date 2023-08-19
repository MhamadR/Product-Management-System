import { useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/AddProduct.scss";
import Button from "../components/Button";

function AddProduct() {
  const [formInput, setFormInput] = useState({
    sku: "",
    name: "",
    price: "",
    size: "",
  });

  const [errors, setErrors] = useState({});

  function handleInputChange({ target: { name, value } }) {
    // Filter out spaces for all input types
    if (value.includes(" ")) {
      return;
    }

    // If value is empty, set invalid message
    if (value === "") {
      setErrors((prev) => ({ ...prev, [name]: `${name} is empty` }));
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
    // Change formInput properties according to the type of product
    switch (type) {
      case "Furniture":
        setFormInput(({ sku, name, price }) => {
          return {
            sku,
            name,
            price,
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
            size: "",
          };
        });
        break;
    }
  }

  function handleSubmit(e) {
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
      console.log("Valid!");
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
            type="number"
            name="price"
            id="price"
            className={errors.price ? "invalid" : ""}
            min="0"
            value={formInput.price}
            onChange={handleInputChange}
            // filter out "e", "E", "+", "-" from the inputs with type number
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
          />
          {errors.price && <p className="invalid-message">{errors.price}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="productType">Type Switcher</label>
          <select
            name="product-type"
            id="productType"
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
                type="number"
                name="size"
                id="size"
                className={errors.size ? "invalid" : ""}
                min="0"
                value={formInput.size}
                onChange={handleInputChange}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
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
                type="number"
                name="height"
                id="height"
                className={errors.height ? "invalid" : ""}
                min="0"
                value={formInput.height}
                onChange={handleInputChange}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
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
              type="number"
              name="width"
              id="width"
              className={errors.width ? "invalid" : ""}
              min="0"
              value={formInput.width}
              onChange={handleInputChange}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
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
              min="0"
              value={formInput.length}
              onChange={handleInputChange}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
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
                type="number"
                name="weight"
                id="weight"
                className={errors.weight ? "invalid" : ""}
                min="0"
                value={formInput.weight}
                onChange={handleInputChange}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
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
