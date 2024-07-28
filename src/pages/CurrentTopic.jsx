import React from 'react'
import ImageContainer from '../components/ImagesContainer'
import { useParams } from 'react-router-dom';

const CurrentTopic = () => {
  const {topicName} = useParams();

  return (
    <section>
      <h2 className='text-2xl text-black font-bold py-4 sm:py-6'>{topicName}</h2>
      <ImageContainer />
    </section>
  )
}

export default CurrentTopic