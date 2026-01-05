import { useEffect, useMemo, useState } from "react";
import { useSpeciesGenusCache } from "../hooks/useSpeciesGenusCache.js";

export default function PokemonCard({ pokemon, types }) {
  const { getGenus } = useSpeciesGenusCache();
  const [genus, setGenus] = useState("");

  const primaryType = pokemon.types?.[0]?.type?.name;

  const typeStyle = useMemo(() => {
    const found = types.find((t) => t.name === primaryType);
    if (!found) return {};
    return { borderColor: found.color, boxShadow: found.shadow };
  }, [types, primaryType]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const g = await getGenus(pokemon.id);
      if (!cancelled) setGenus(g);
    })();
    return () => {
      cancelled = true;
    };
  }, [getGenus, pokemon.id]);

  return (
    <div className="card" style={typeStyle}>
      <h2>{pokemon.name}</h2>

      <img
        src={`/images/${pokemon.name}.png`}
        width={150}
        height={150}
        alt={pokemon.name}
        loading="lazy"
      />

      <h4 className="pokemon-genus">{genus ? `The ${genus}` : ""}</h4>
    </div>
  );
}
