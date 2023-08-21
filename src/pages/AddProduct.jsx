import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import axios from "axios";
import "../Styles/AddProduct.scss";
import InputField from "../components/InputField";

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
    if (value.indexOf(" ") === 0) {
      value = value.substring(1);
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
    if (errors[name] && value !== "") {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleTypeChange(e) {
    const type = e.target.value;
    let data = {};
    // Change formInput properties according to the type of product
    switch (type) {
      case "Furniture":
        data = { height: "", width: "", length: "" };
        break;
      case "Book":
        data = { weight: "" };
        break;

      default:
        data = { size: "" };
        break;
    }
    setFormInput(({ sku, name, price }) => ({
      sku,
      name,
      price,
      type: type,
      ...data,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const handleErrors = (newErrors) => {
      setErrors(() => ({
        ...newErrors,
        formMessage: "Please submit required data",
      }));
      // Show form message for a period
      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          formMessage: undefined,
        }));
      }, 3000);
    };

    // Check if any of the formInput properties is empty
    const emptyInputKeys = Object.keys(formInput).filter(
      (key) => formInput[key] === ""
    );

    if (emptyInputKeys.length > 0) {
      const newErrors = {};

      // If any property is empty, set the errors state
      emptyInputKeys.forEach((key) => {
        newErrors[key] = `${key} is empty`;
      });

      handleErrors(newErrors);
    } else {
      // If all properties are filled, perform the POST request
      try {
        await axios.post(URL, formInput);
        navigate("/");
      } catch (error) {
        if (error.response?.data) {
          // If an error occur, set the errors state
          handleErrors(error.response.data);
          console.clear(); // To not allow the browser to show response codes as errors
        } else {
          console.log(`Error: ${error}, Error Message: ${error.message}`);
        }
      }
    }
  }

  return (
    <div className="add-product-container">
      <Navbar title="Add Product">
        <Button
          element={"input"}
          type="submit"
          id="save-product-btn"
          className="save-btn btn-success"
          value="Save"
          form="product_form"
        />
        <Button to="/" className="cancel-btn btn-danger" value={"Cancel"} />
      </Navbar>

      <form id="product_form" className="product-form" onSubmit={handleSubmit}>
        <p className="product-form-error-message">{errors.formMessage}</p>

        <InputField
          label="SKU"
          name="sku"
          id="sku"
          maxLength="255"
          value={formInput.sku}
          onChange={handleInputChange}
          error={errors.sku}
        />
        <InputField
          label="Name"
          name="name"
          id="name"
          maxLength="255"
          value={formInput.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <InputField
          label="Price ($)"
          name="price"
          id="price"
          maxLength="10"
          inputMode="decimal"
          value={formInput.price}
          onChange={handleInputChange}
          error={errors.price}
        />
        <InputField
          label="Type Switcher"
          name="productType"
          id="productType"
          maxLength="10"
          inputMode="decimal"
          value={formInput.type}
          onChange={handleTypeChange}
          selectOptions={[
            { value: "DVD" },
            { value: "Furniture" },
            { value: "Book" },
          ]}
        />
        {"size" in formInput && (
          <>
            <p className="product-form-dynamic-message">
              Please provide a size
            </p>
            <InputField
              label="Size (MB)"
              name="size"
              id="size"
              maxLength="10"
              inputMode="decimal"
              value={formInput.size}
              onChange={handleInputChange}
              error={errors.size}
            />
          </>
        )}
        {"height" in formInput && (
          <>
            <p className="product-form-dynamic-message">
              Please provide dimensions
            </p>
            <InputField
              label="Height (CM)"
              name="height"
              id="height"
              maxLength="10"
              inputMode="decimal"
              value={formInput.height}
              onChange={handleInputChange}
              error={errors.height}
            />
          </>
        )}
        {"width" in formInput && (
          <InputField
            label="Width (CM)"
            name="width"
            id="width"
            maxLength="10"
            inputMode="decimal"
            value={formInput.width}
            onChange={handleInputChange}
            error={errors.width}
          />
        )}
        {"length" in formInput && (
          <InputField
            label="Length (CM)"
            name="length"
            id="length"
            maxLength="10"
            inputMode="decimal"
            value={formInput.length}
            onChange={handleInputChange}
            error={errors.length}
          />
        )}
        {"weight" in formInput && (
          <>
            <p className="product-form-dynamic-message">
              Please provide a weight
            </p>
            <InputField
              label="Weight (KG)"
              name="weight"
              id="weight"
              maxLength="10"
              inputMode="decimal"
              value={formInput.weight}
              onChange={handleInputChange}
              error={errors.weight}
            />
          </>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
