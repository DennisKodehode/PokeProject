export default function TypeFilters({ types, selectedTypes, onToggle }) {
  return (
    <ul className="filter-viewport">
      {types.map((type) => {
        const isSelected = selectedTypes.has(type.name);

        const style = {
          backgroundColor: isSelected ? type.color : "",
          color: isSelected ? "#1E1E1E" : "#E5E5E5",
          borderColor: isSelected ? "" : type.color,
        };

        return (
          <li key={type.name}>
            <button
              type="button"
              className="filter-pill"
              style={style}
              onClick={() => onToggle(type.name)}
              aria-pressed={isSelected}
            >
              {type.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
