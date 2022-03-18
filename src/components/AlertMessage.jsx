import { memo } from "react";
import PropTypes from "prop-types";
import { BsExclamationCircle, BsX } from "react-icons/bs";

const AlertMessage = ({ message, onCloseButtonClicked }) => {
  return (
    <div className="text-sm rounded p-3 bg-red-50 flex items-center gap-x-3">
      <BsExclamationCircle size={16} className="text-red-500" />
      <p className="text-red-500 grow">{message}</p>
      <button onClick={onCloseButtonClicked} className="p-1 rounded-full hover:bg-red-300">
        <BsX size={16} />
      </button>
    </div>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onCloseButtonClicked: PropTypes.func.isRequired
};

export default memo(AlertMessage);
