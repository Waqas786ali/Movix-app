import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.scss'
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';


function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming")
  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
    setBackground(bg)

  }, [data])


  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }
  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
        <Img src={background} />
      </div>}
      <div className='opacity-layer'></div>

      <ContentWrapper>
        <div className='wrapper'>
          <div className='heroBannerContant'>
            <span className='title'>Welcome.</span>
            <span className='subTitle'>Millions of moves, TV shows and people to discover.Explore now.</span>
            <div className='searchInput'>
              <input onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} type='text' placeholder='Search for move and tv show...' />
              <button>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner