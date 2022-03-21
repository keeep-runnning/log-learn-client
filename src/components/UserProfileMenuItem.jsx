import PropTypes from "prop-types";

const UserProfileMenuItem = ({ menuName, icon }) => {
  return (
    <div className="flex items-center gap-4 hover:font-bold text-gray-500 hover:text-gray-900">
      <span>{menuName}</span>
      {icon}
    </div>
  );
};

UserProfileMenuItem.propTypes = {
  menuName: PropTypes.string.isRequired,
  icon: PropTypes.node
}

export default UserProfileMenuItem;
