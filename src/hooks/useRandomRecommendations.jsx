import { useEffect, useState } from "react";
import { getRandomDestinations } from "../services/destino.service";

const useRandomRecommendations = (limit = 10) => {
  const [destinations, setDestinations] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    let active = true;
    setFetching(true);

    getRandomDestinations(limit)
      .then((data) => {
        if (active) setDestinations(data || []);
      })
      .catch((error) => {
        console.error("Error fetching random recommendations:", error);
        if (active) setDestinations([]);
      })
      .finally(() => {
        if (active) setFetching(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { destinations, fetching };
};

export default useRandomRecommendations;
