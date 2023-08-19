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
        className="delete-checkbox"
        name={name}
        id={id}
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      <label htmlFor={id}>
        <p>{sku} </p>
        <p> {name}</p>
        <p> {price} $ </p>
        <p>
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
