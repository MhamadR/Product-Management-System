// InputField.js
import PropTypes from "prop-types";

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
      <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
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
      <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          name={name}
          id={name}
          className={error ? "invalid" : ""}
          value={value}
          onChange={onChange}
          {...props}
        />
        {error && <p className="invalid-message">{error}</p>}
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
