import React, { useContext } from "react";
import Masonry from "react-masonry-css";
import Image from "./subComponents/ImageContainer";

import sample from '../assets/sample.jpg'
import sample2 from '../assets/sample2.jpg'
import ApiContext from "../contexts/ApiContext";

const breakpointColumnsObj = {
  default: 3,
  1280: 2,
  750: 1,
};


const ImageContainer = ({data}) => {
  console.log(data[0]);
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-6"
    >
      {data?.map((item, index)=>{
        const num = Math.floor(Math.random() * 2) + 1;
        return num === 2? <Image data = {item} item={item} key={index} details={sample2}/>:<Image item={item} data = {item} key={index} details={sample}/>
        return <Image data={item} key={index} />
      })}
    </Masonry>
  );
};

export default ImageContainer;
