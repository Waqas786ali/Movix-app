import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFormApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFormApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum(1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFormApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };
    const fetchPrePageData = () => {
        if(pageNum > 0){
            fetchDataFormApi(
                `/discover/${mediaType}?page=${pageNum}`,
                filters
            ).then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev - 1 );
            })
        }
    };

    const fetchbtn1PageData = () => {
        if(pageNum > 0){
            fetchDataFormApi(
                `/discover/${mediaType}?page=${pageNum}`,
                filters
            ).then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum(1);
            })
        }
        setPageNum(1)
    };

    const fetchbtn2PageData = () => {
        if(pageNum > 0){
            fetchDataFormApi(
                `/discover/${mediaType}?page=${pageNum}`,
                filters
            ).then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum(2);
            })
        }
        setPageNum(2)
    };

    const fetchbtn3PageData = () => {
        if(pageNum > 0){
            fetchDataFormApi(
                `/discover/${mediaType}?page=${pageNum}`,
                filters
            ).then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum(3);
            })
        }
        setPageNum(3)
    };

    const fetchbtn4PageData = () => {
        if(pageNum > 0){
            fetchDataFormApi(
                `/discover/${mediaType}?page=${pageNum}`,
                filters
            ).then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum(data?.total_pages);
            })
        }
        setPageNum(data?.total_pages)
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    
    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                hasMore={pageNum <= data?.total_pages}
                            // loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                                <div className="pag">
                                    <BsFillArrowLeftCircleFill
                                        className={`left arrow2  ${pageNum <= 1 ? "hidden" : "show"}`} onClick={fetchPrePageData} />
                                    <span className={`${pageNum === 1 ? "active" : " "}`} onClick={fetchbtn1PageData}><p>1</p></span>
                                    <span className={` ${pageNum === 2 ? "active" : " "} ${data?.total_pages >= 2 ?  "show" :"hidden"}`} onClick={fetchbtn2PageData}><p>2</p></span>
                                    <span className={`${pageNum === 3 ? "active" : " "} ${data?.total_pages >= 3 ?  "show" :"hidden"}`} onClick={fetchbtn3PageData}><p>3</p></span>
                                    <span className="span1"> - - - {" "} Page No {pageNum} - - - </span>
                                    <span className={`${pageNum === data?.total_pages ? "active" : " "}`}  onClick={fetchbtn4PageData}><p>{data?.total_pages}</p></span>

                                    <BsFillArrowRightCircleFill
                                        className={`right arrow2 ${pageNum >= data?.total_pages ? "hidden" : "show"}`} onClick={fetchNextPageData} />
                                </div>
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;


