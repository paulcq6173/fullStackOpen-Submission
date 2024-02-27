import PropTypes from "prop-types";

Header.propTypes = {
  name: PropTypes.string,
};

const Header = ({ name }) => {
  console.log(name);
  return <h1>{name}</h1>;
};

export default Header;
