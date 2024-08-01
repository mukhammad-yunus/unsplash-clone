import React, { useContext, useEffect, useState } from 'react'
import ImagesContainer from '../components/ImagesContainer'
import ApiContext from '../contexts/ApiContext'
const EmptyFavorites = ()=>{
  return (
    <div className="">There is no liked image</div>
  )
}
const Favorites = () => {
  const {change} = useContext(ApiContext)
  const [images, setImages] = useState(()=>{
    return JSON.parse(localStorage.getItem("favorite-images")) || []
  })
  useEffect(() => {
    setImages(()=>JSON.parse(localStorage.getItem("favorite-images")) || [])
    
  }, [change])
  
  console.log(images);
  if(!images.length) return <EmptyFavorites/>
  return (
    <div className='my-5'>
      <h2 className="py-5 text-xl font-bold text-black">Favorites</h2>
      <ImagesContainer data={images}/>
    </div>
  )
}

export default Favorites