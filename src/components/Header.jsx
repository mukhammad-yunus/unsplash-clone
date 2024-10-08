import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import sample from '../assets/sample.jpg'
import ApiContext from '../contexts/ApiContext'
import { Link } from "react-router-dom";
const Header = () => {
  const [collections, setCollections] = useState([])
  const [featured, setFeatured] = useState(false)
  const {getFromApi} = useContext(ApiContext)
  /*
      - colArr is just temporary array of collections. Elements in the array are just 0s. In the future there will be the real collections array. Then, I can delete collArr
      - displayColl is a variable that stores the rendered collections
  */
  const colArr = new Array(4).fill(0)
  const displayColl = ()=>{
    if (!collections.length) return <div className="">Loading...</div>

    return collections.map((collection, index)=>{
    return (
      <div onClick={() => window.open(collection.links.html)} key={collection.id} className="flex items-center gap-2 cursor-pointer rounded transition-all px-2 hover:bg-zinc-100">
        <img src={collection.cover_photo.urls.thumb} alt="" className="block w-7 h-7 object-cover rounded"/>
        <div className="">
          <p className="font-bold text-sm text-neutral-800">{collection.title}</p>
          <p className=" text-xs">by {collection.user.name}</p>
        </div>
      </div>
    )
  })}

  useEffect(() => {
    const handleCollections = async ()=>{
      const result_collection = await getFromApi('https://api.unsplash.com/collections?per_page=4&page=4')
      const result_featured = await getFromApi('https://api.unsplash.com/photos/random')
      setCollections([...result_collection])
      setFeatured(result_featured)
    }
    handleCollections()
  }, [])
  
  return (
    <header className="grid grid-cols-small-header grid-rows-custom-header gap-x-4 overflow-x-scroll no-scrollbar md:grid-cols-usual-header lg:grid-cols-big-screen-header justify-between mb-12">
      <section className="h-full flex flex-col justify-end">
        <div className="mb-4">
          <h1 className=" text-[40px] font-bold text-neutral-800">Unsplash</h1>
          <p>The internet’s source for visuals.</p>
          <p>Powered by creators everywhere.</p>
        </div>
        {/* below search-input field is invisible for mobile device
          For this element, I have to implement:
                  - div's flex-direction should be reversed when the input is active
                  - change in div's bg when the input is active
                  - search function for Enter keyboard and search icon
                  - search terms should be stored into localStorage and the history of search be displayed as a floating element when input is active
          */}
        <div className="w-full flex items-center gap-2 bg-zinc-100 rounded-md p-2">
          <div>
            <IoSearch className=" text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent placeholder:text-gray-400 focus:outline-none"
            placeholder="Search images"
          />
        </div>
      </section>
      <section className="h-full border rounded-md p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between pt-3 px-2">
          <p className="font-bold text-neutral-800">Collections</p>
          <a href="#" className="block hover:underline">See all</a>
        </div>
        <div className="flex flex-col gap-4">
          {displayColl()}
        </div>
      </section>
      <section className="h-full border rounded-md overflow-hidden cursor-pointer">
        { featured?
            <div className="group bg-black w-full h-full relative"
              onClick={() => window.open(featured.links.html)}
            >
              <img src={featured.urls.regular} alt="" className="w-full h-full object-cover group-hover:scale-110 transition" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-xs">featured</p>
                <p className="text-[15px]">{featured.user.name}</p>
              </div>
            </div>:
            <div className="">Loading...</div>
          }
      </section>
    </header>
  );
};

export default Header;
