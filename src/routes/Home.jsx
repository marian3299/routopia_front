import React from "react";
import SearchContainer from "../components/SearchContainer";
import Categories from "../components/Categories";
import Recomendations from "../components/Recomendations";
import SearchResults from "../components/SearchResults";
import { useAppSelector } from "../redux/store";

const Home = () => {
  const { hasSearch, search } = useAppSelector((state) => state.routopiaStore);

  return (
    <main>
      <SearchContainer />
      {hasSearch ? (
        <SearchResults searchQuery={search} />
      ) : (
        <>
          <Categories />
          <Recomendations />
        </>
      )}
    </main>
  );
};

export default Home;
