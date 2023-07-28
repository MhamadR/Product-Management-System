import PropTypes from "prop-types";
import "../Styles/Navbar.scss";

function Navbar({ title, children }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">{title}</h1>
      <div className="navbar-buttons">{children}</div>
    </nav>
  );
}

// Defining PropTypes in order to solve ESLint error: is missing in props validationeslintreact/prop-types)
Navbar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Navbar;
