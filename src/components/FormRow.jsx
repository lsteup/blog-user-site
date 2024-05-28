const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="flex justify-between items-center">
      <label htmlFor={name}>{name}</label>
      <input
        className="border border-black"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default FormRow;
