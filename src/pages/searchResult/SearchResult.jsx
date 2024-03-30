import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFormApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import noResults from '../../assets/no-results.png'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import './style.scss'

let filters = {};

function searchResult() {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFormApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum(1);
      setLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchDataFormApi(`/search/multi?query=${query}&page=${pageNum}`, filters).then((res) => {
      if (data?.results) {
        setData({
          ...data, results: [...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1);
    })
  }

  const fetchPrePageData = () => {
    if (pageNum > 0) {
      fetchDataFormApi(
        `/search/multi?query=${query}&page=${pageNum}`,
        filters
      ).then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...res.results]
          })
        } else {
          setData(res)
        }
        setPageNum((prev) => prev - 1);
      })
    }
  };

  const fetchbtn1PageData = () => {
    if (pageNum > 0) {
      fetchDataFormApi(
        `/search/multi?query=${query}&page=${pageNum}`,
        filters
      ).then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...res.results]
          })
        } else {
          setData(res)
        }
        setPageNum(1);
      })
    }
    setPageNum(1)
  };

  const fetchbtn2PageData = () => {
    if (pageNum > 0) {
      fetchDataFormApi(
        `/search/multi?query=${query}&page=${pageNum}`,
        filters
      ).then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...res.results]
          })
        } else {
          setData(res)
        }
        setPageNum(2);
      })
    }
    setPageNum(2)
  };

  const fetchbtn3PageData = () => {
    if (pageNum > 0) {
      fetchDataFormApi(
        `/search/multi?query=${query}&page=${pageNum}`,
        filters
      ).then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...res.results]
          })
        } else {
          setData(res)
        }
        setPageNum(3);
      })
    }
    setPageNum(3)
  };

  const fetchbtn4PageData = () => {
    if (pageNum > 0) {
      fetchDataFormApi(
        `/search/multi?query=${query}&page=${pageNum}`,
        filters
      ).then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...res.results]
          })
        } else {
          setData(res)
        }
        setPageNum(data?.total_pages);
      })
    }
    setPageNum(data?.total_pages)
  };

  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query])


  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ?
            (
              <>
                <div className="pageTitle">
                  {`Search ${data?.total_results > 1
                    ? "results"
                    : "result"
                    } of '${query}'`}
                </div>
                <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length || []}
                  hasMore={pageNum <= data?.total_pages}
                // loader={<Spinner />}
                >
                  {data?.results?.map((item, index) => {
                    if (item.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })}

                  <div className="pag">
                    <BsFillArrowLeftCircleFill
                      className={`left arrow2 ${pageNum <= 1 ? "hidden" : "show"}`} onClick={fetchPrePageData} />
                                    <span className={`${pageNum === 1 ? "active" : " "}`} onClick={fetchbtn1PageData}><p>1</p></span>
                                    <span className={` ${pageNum === 2 ? "active" : " "} ${data?.total_pages >= 2 ?  "show" :"hidden"}`} onClick={fetchbtn2PageData}><p>2</p></span>
                                    <span className={`${pageNum === 3 ? "active" : " "} ${data?.total_pages >= 3 ?  "show" :"hidden"}`} onClick={fetchbtn3PageData}><p>3</p></span>
                                    <span className="span1"> - - - {" "} Page No {pageNum} - - - </span>
                                    <span className={`${pageNum === data?.total_pages ? "active" : " "}`}  onClick={fetchbtn4PageData}><p>{data?.total_pages}</p></span>

                    <BsFillArrowRightCircleFill
                      className={`right arrow2 ${pageNum >= data?.total_pages ? "hidden" : "show"}`} onClick={fetchNextPageData} />
                  </div>
                </InfiniteScroll>
              </>
            )
            :
            (
              <span className="resultNotFound">
                sorry , Results not found
              </span>
            )
          }
        </ContentWrapper>
      )}
    </div>
  )
}

export default searchResult