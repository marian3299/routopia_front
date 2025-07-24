import React from "react";

const useCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Francia",
      type: "FRANCE",
      image: "/src/assets/paris.jpg",
    },
    {
      id: 2,
      name: "Japon",
      type: "JAPAN",
      image: "/src/assets/japon.jpg",
    },
    {
      id: 3,
      name: "México",
      type: "MEXICO",
      image: "/src/assets/chiapas.webp",
    },
    {
      id: 4,
      name: "Grecia",
      type: "GREECE",
      image: "/src/assets/grecia.jpg",
    },
    {
      id: 5,
      name: "Tailandia",
      type: "THAILAND",
      image: "/src/assets/tailandia.webp",
    },
  ];

  return { categories };
};

export default useCategories;
