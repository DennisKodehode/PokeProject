import PokemonCard from "./PokemonCard.jsx";

export default function PokemonGrid({ pokemons, types, favorites }) {
  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          types={types}
          favorites={favorites}
        />
      ))}
    </div>
  );
}
