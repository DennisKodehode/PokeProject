import { useCallback, useRef } from "react";

const POKEMON_API_URL = "https://pokeapi.co/api/v2";

export function useSpeciesGenusCache() {
  const cacheRef = useRef(new Map()); // id -> genus string

  const getGenus = useCallback(async (id) => {
    if (cacheRef.current.has(id)) return cacheRef.current.get(id);

    try {
      const res = await fetch(`${POKEMON_API_URL}/pokemon-species/${id}`);
      if (!res.ok) throw new Error("Failed to fetch species");
      const json = await res.json();

      // Your original used genera[7]. That's usually English in many cases,
      // but safer is: pick "en" if it exists.
      const english = json.genera?.find((g) => g.language?.name === "en");
      const genus = english?.genus || "";

      cacheRef.current.set(id, genus);
      return genus;
    } catch {
      cacheRef.current.set(id, "");
      return "";
    }
  }, []);

  return { getGenus };
}
