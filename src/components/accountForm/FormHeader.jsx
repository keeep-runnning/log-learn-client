import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FormHeader = ({ title }) => {
  return (
    <header className="text-center space-y-4">
      <Link to="/" className="text-sm text-gray-400">log learn</Link>
      <h2 className="text-2xl font-bold">{title}</h2>
    </header>
  );
};

FormHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default memo(FormHeader);
