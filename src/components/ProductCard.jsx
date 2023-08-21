import PropTypes from "prop-types";
import "../Styles/ProductCard.scss";

function ProductCard({
  id,
  sku,
  name,
  price,
  property,
  value,
  isChecked,
  onCheckBoxChange,
}) {
  function handleCheckBoxChange(e) {
    onCheckBoxChange(e);
  }

  return (
    <div className="product-card">
      <input
        type="checkbox"
        className="product-card-checkbox"
        name={name}
        id={id}
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      <label htmlFor={id} className="product-card-label">
        <p className="product-card-value">{sku} </p>
        <p className="product-card-value"> {name}</p>
        <p className="product-card-value"> {price} $ </p>
        <p className="product-card-value">
          {property}: {value}
        </p>
      </label>
    </div>
  );
}

// Defining PropTypes in order to solve ESLint error: is missing in props validationeslintreact/prop-types)
ProductCard.propTypes = {
  id: PropTypes.number,
  sku: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  property: PropTypes.string,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  onCheckBoxChange: PropTypes.func,
};

// ProductCard.defaultProps = {
//   id: "",
// };

export default ProductCard;
