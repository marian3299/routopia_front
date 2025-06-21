import React, { useState, useEffect } from "react";
import { getDestinations } from "../services/destino.service";

const useRecomendations = () => {
  const [recomendations, setRecomendations] = useState([]);
  /* const recomendations = [
    {
      id: 1,
      name: "Torre Eiffel",
      location: "París, Francia",
      score: 4.5,
      price: 100,
      image: "/src/assets/torre_eiffel.jpg",
    },
    {
      id: 2,
      name: "Asakusa",
      location: "Tokio, Japón",
      score: 4.0,
      price: 80,
      image: "/src/assets/asakusa.webp",
    },
    {
      id: 3,
      name: "Cañón del Sumidero",
      location: "Chiapas, México",
      score: 4.8,
      price: 50,
      image: "/src/assets/canon_del_sumidero.jpg",
    },
    {
      id: 4,
      name: "Partenón",
      location: "Atenas, Grecia",
      score: 4.2,
      price: 90,
      image: "/src/assets/pertenon.jpg",
    },
    {
      id: 5,
      name: "Wat Pho",
      location: "Bangkok, Tailandia",
      score: 4.3,
      price: 70,
      image: "/src/assets/wat_pho.webp",
    },
  ]; */

  const getRecomendations = async () => {
    try {
      const response = await getDestinations();
      setRecomendations(response);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    getRecomendations();
  }, []);

  return { recomendations };
};

export default useRecomendations;
