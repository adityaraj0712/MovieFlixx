import React from 'react'
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Treding from './trending/Treding'
import Popular from './popular/Popular'
import TopRated from './toprated/TopRated'
 
HeroBanner

const Home = () => {
  return (
    <div className='HomePage'>
      <>
      {/* <h1>hello hoome</h1> */}
      <HeroBanner/>
      <Treding/>
      <Popular/>
      <TopRated/>

      <div  ></div>
      </>
    </div>
  )
}

export default Home
