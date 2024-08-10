import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiContext from "../contexts/ApiContext";
import ImageContainer from "../components/ImagesContainer";
import Loader from "../components/Loader";
const Search = () => {
  const { searchInput } = useParams();
  const [result, setResult] = useState({loading: true, data: false});
  const { handleSearch, setSearchInputValue } = useContext(ApiContext);
  useEffect(() => {
    setResult({loading: true, data: false})
    const getResult = async () => {
      const data = await handleSearch(searchInput);
      if (data.total === 0) {
        setResult({loading: false, data: "not-found"});
      } else {
        setResult({loading: false, data: data.results});
      }
    };
    if (searchInput) {
      setSearchInputValue(searchInput)
      getResult();
    }
  }, [searchInput]);
  const displayResult = () => {
    if (result.data === "not-found") {
      return (
        <p>
          There is no image based on your request. Please try another keyword.
        </p>
      );
    } else {
      return <ImageContainer data={result.data} />;
    }
  };
  return (
    <section>
      <h2 className="text-2xl text-black font-bold py-4 sm:py-6">
        {searchInput}
      </h2>
      {result.loading ? <Loader/>: result && displayResult()}
    </section>
  );
};

export default Search;
