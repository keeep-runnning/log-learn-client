const FieldErrorMessage = ({ message }) => {
  return (
    <div className="font-bold text-red-500 text-xs p-1">
      {message}
    </div>
  );
};

export default FieldErrorMessage;
