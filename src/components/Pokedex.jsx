import { useMemo, useState } from "react";
import { pokemonTypes } from "../data/pokemonTypes.js";
import { usePokemonList } from "../hooks/usePokemonList.js";
import Search from "./search.jsx";
import TypeFilters from "./TypeFilters.jsx";
import PokemonGrid from "./PokemonGrid.jsx";
import Pagination from "./Pagination.jsx";

const PAGE_SIZE = 9;

export const Pokedex = () => {
    
    const { data: pokemonsData, loading, error } = usePokemonList({ limit: 151, offset: 0 });
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedTypes, setSelectedTypes] = useState(() => new Set());

  const filtered = useMemo(() => {
    const search = searchText.trim().toLowerCase();
    return pokemonsData.filter((pokemon) => {
      const primaryType = pokemon.types?.[0]?.type?.name;
      const matchesType = selectedTypes.size === 0 || selectedTypes.has(primaryType);
      const matchesSearch = !search || pokemon.name.toLowerCase().includes(search);
      return matchesType && matchesSearch;
    });
  }, [pokemonsData, searchText, selectedTypes]);

  const maxPage = useMemo(() => {
    return Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  }, [filtered.length]);

  const currentPage = Math.min(page, maxPage);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const onSearchChange = (value) => {
    setSearchText(value);
    setPage(1);
  };

  const onToggleType = (typeName) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(typeName)) next.delete(typeName);
      else next.add(typeName);
      return next;
    });
    setPage(1);
  };

    return (
        <section className="sectionPokedex">
            <h2>Pokedex</h2>
            <Search value={searchText} onChange={onSearchChange}/>
            

            <TypeFilters
                types={pokemonTypes}
                selectedTypes={selectedTypes}
                onToggle={onToggleType}
            />

        {loading && <p>Loading Pokédex…</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
            <>
            <PokemonGrid
                pokemons={pageItems}
                types={pokemonTypes}
            />

            <Pagination
                page={currentPage}
                maxPage={maxPage}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(maxPage, p + 1))}
            />
            </>
        )}

        </section>
    )
}