import { useEffect, useRef, useState } from "react";

/**
 * Campo de búsqueda con debounce. Llama a onSearch tras dejar de escribir.
 * @param {string} placeholder
 * @param {number} debounceMs - ms de espera (default 400)
 * @param {(term: string) => void} onSearch - recibe el término ya recortado
 * @param {string} className - clase del input
 * @param {string} containerClassName - clase del contenedor
 * @param {boolean} skipInitialSearch - no dispara onSearch al montar (default true)
 */
const SearchInput = ({
  placeholder = "Buscar...",
  debounceMs = 400,
  onSearch,
  className = "users-search-input",
  containerClassName = "users-search-container",
  skipInitialSearch = true,
}) => {
  const [value, setValue] = useState("");
  const onSearchRef = useRef(onSearch);
  const skipFirstRef = useRef(skipInitialSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (skipFirstRef.current) {
      skipFirstRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSearchRef.current?.(value.trim());
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  return (
    <div className={containerClassName}>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={className}
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchInput;
