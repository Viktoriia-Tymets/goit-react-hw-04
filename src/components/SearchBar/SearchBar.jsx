import toast from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.input.value.trim();

    if (query === "") {
      toast("Будь ласка, введіть текст для пошуку зображень");
      return;
    }
    onSearch(query);
    e.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
