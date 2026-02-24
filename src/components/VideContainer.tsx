import { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

import type { Video } from "../utils/types";

const VideContainer = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API);
    const json = await data.json();
    console.log("-", json.items);
    setVideos(json.items);
  };

  return (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <Link key={video?.id} to={"/watch?v=" + video?.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideContainer;
