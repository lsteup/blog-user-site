const Form = ({ handleSubmit, handleChange, handleImgChange, loading }) => {
  return (
    <form
      className="pt-4 px-8 font-serif min-h-full    max-w-4xl mx-auto"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="my-6 w-full"></div>
      <input
        className=" caret-stone-400 w-full font-light text-4xl block placeholder:capitalize placeholder-stone-400  focus:outline-none  py-2 mb-8 "
        placeholder="Title"
        type="text"
        name="title"
        value={values.name}
        onChange={handleChange}
      />

      <textarea
        className="placeholder:text-stone-400 text-xl h-[55vh] grow w-full text-black  focus:outline-none mb-8 "
        onChange={handleChange}
        name="content"
        id="content"
        placeholder="Share your story ..."
      ></textarea>
      <input
        className="file:mr-4"
        type="file"
        onChange={handleImgChange}
      ></input>
      <button
        className={
          loading
            ? "p-2 border  w-full bg-stone-200 uppercase text-sm my-6 cursor-not-allowed mb-8"
            : "p-2 border  w-full bg-stone-900 uppercase text-stone-50 my-6 hover:bg-stone-700 mb-8"
        }
        disabled={loading}
        type="submit"
      >
        {loading ? "Loading..." : "Save Draft"}
      </button>
    </form>
  );
};
export default Form;
