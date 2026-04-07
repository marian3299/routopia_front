import React, { useCallback, useEffect, useState } from "react";
import { useNotification } from "../context/useNotificationProvider";
import { getTraits } from "../services/traits.service";

const useTraitsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [traits, setTraits] = useState([]);
  const [filteredTraits, setFilteredTraits] = useState([]);
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();

  const fetchTraits = useCallback(async () => {
    try {
      const res = await getTraits();
      setTraits(res.content);
      setFilteredTraits(res.content);
    } catch (err) {
      console.error("Error fetching traits:", err);
      notify({ message: "Error al cargar características", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = traits.filter((trait) =>
        trait.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTraits(filtered);
    } else {
      setFilteredTraits(traits);
    }
  }, [searchTerm, traits]);

  useEffect(() => {
    fetchTraits();
  }, [fetchTraits]);

  return {
    traits,
    setTraits,
    searchTerm,
    setSearchTerm,
    filteredTraits,
    loading,
  };
};

export default useTraitsList;
