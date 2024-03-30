import React from 'react'
import './style.scss'
import HeroBanner from './herobanner/Herobanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopReted from './topReted/TopReted'

function Home() {
  return (
    <div className='homepage'>
    <HeroBanner />
    <Trending />
    <Popular />
    <TopReted />
    </div>
  )
}

export default Home