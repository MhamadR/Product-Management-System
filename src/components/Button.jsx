import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../Styles/Button.scss";

function Button({ to, element, value, onClick, ...props }) {
  const handleClick = () => {
    onClick();
  };

  if (to) {
    return (
      <Link to={to} {...props}>
        {value}
      </Link>
    );
  } else if (element === "input") {
    return <input value={value} {...props} />;
  } else {
    return (
      <button onClick={handleClick} {...props}>
        {value}
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  to: PropTypes.string,
  element: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
