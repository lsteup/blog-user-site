const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="my-6 w-full">
      <label
        className="block uppercase text-xs text-stone-500 my-2"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        className=" p-1 w-full block placeholder:capitalize placeholder-stone-500 text-sm transition-[background] focus:bg-[length:100%_1px] bg-left-bottom bg-gradient-to-r bg-[length:0%_1px] bg-no-repeat from-black to-black duration-300 focus:outline-none border-b border-gray py-2 my-1 "
        placeholder={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
};
export default FormRow;
