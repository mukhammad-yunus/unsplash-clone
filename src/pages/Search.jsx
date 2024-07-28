import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ApiContext from '../contexts/ApiContext';
import ImageContainer from '../components/ImagesContainer';

const Search = () => {
  const {searchInput} = useParams();
  // const {getFromApi, setSearchInputValue, apiKey} = useContext(ApiContext);
  // useEffect(() => {
  //   if (searchInput) {
  //     const query = "https://api.unsplash.com/photos/?client_id=" + apiKey
  //     getFromApi(query);
  //     setSearchInputValue(searchInput);
  //   }
  // }, [searchInput])
  
  return (
    <section>
      <h2 className='text-2xl text-black font-bold py-4 sm:py-6'>{searchInput}</h2>
      <ImageContainer />
    </section>
  )
}

export default Search