import { useEffect, useState } from "react";

const POKEMON_API_URL = "https://pokeapi.co/api/v2";

export function usePokemonList({ limit = 151, offset = 0 } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError("");

      try {
        const listRes = await fetch(
          `${POKEMON_API_URL}/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!listRes.ok) throw new Error("Failed to fetch list");
        const listJson = await listRes.json();

        const detailPromises = listJson.results.map(async (p) => {
          const res = await fetch(p.url);
          if (!res.ok) throw new Error("Failed to fetch pokemon details");
          return res.json();
        });

        const details = await Promise.all(detailPromises);

        if (!cancelled) setData(details);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [limit, offset]);

  return { data, loading, error };
}