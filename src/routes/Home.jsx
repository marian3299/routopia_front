import React from "react";
import SearchContainer from "../components/SearchContainer";
import Categories from "../components/Categories";
import Recomendations from "../components/Recomendations";

const Home = () => {
  return (
    <main>
      <SearchContainer />
      <Categories />
      <Recomendations />
    </main>
  );
};

export default Home;
