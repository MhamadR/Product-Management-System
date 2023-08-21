import PropTypes from "prop-types";
import "../Styles/InputField.scss";

function InputField({
  label,
  name,
  value,
  error,
  onChange,
  selectOptions,
  ...props
}) {
  if (selectOptions) {
    return (
      <div className="product-form-input-container">
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          className="product-form-select"
          value={value}
          onChange={onChange}
          {...props}
        >
          {selectOptions.map((option) => (
            <option key={option.value} value={option.value} id={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <div className="product-form-input-container">
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          name={name}
          id={name}
          className={
            error ? "product-form-input invalid" : "product-form-input"
          }
          value={value}
          onChange={onChange}
          {...props}
        />
        <p className="product-form-input-error-message">{error}</p>
      </div>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      //   label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      //   id: PropTypes.string.isRequired,
    })
  ),
};

export default InputField;
