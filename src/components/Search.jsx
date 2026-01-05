export default function Search({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
