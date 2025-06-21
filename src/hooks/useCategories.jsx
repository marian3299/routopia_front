import React from "react";

const useCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Paris",
      image: "/src/assets/paris.jpg",
    },
    {
      id: 2,
      name: "Japon",
      image: "/src/assets/japon.jpg",
    },
    {
      id: 3,
      name: "Chiapas",
      image: "/src/assets/chiapas.webp",
    },
    {
      id: 4,
      name: "Grecia",
      image: "/src/assets/grecia.jpg",
    },
    {
      id: 5,
      name: "Tailandia",
      image: "/src/assets/tailandia.webp",
    },
  ];

  return { categories };
};

export default useCategories;
