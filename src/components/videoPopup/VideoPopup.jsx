import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";
import Spinner from "../spinner/Spinner";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
        setLoader(true)
    };
    return (
        <div className={`videoPopup ${show ? "visible" : " "} `}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    background="black"
                    className="react-player"
                // playing={true}
                />
                <div className="textvideo2">
                <Spinner />
                </div>
                {!videoId && (
                    <div className="textvideo">
                        <span>{videoId ? "" : 'Video Not Found , Sorry'} </span>
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default VideoPopup;


