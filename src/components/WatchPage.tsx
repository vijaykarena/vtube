import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { YOUTUBE_VIDEO_BY_ID_API } from "../utils/constant";
import type { Video } from "../utils/types";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  const [videoInfo, setVideoInfo] = useState<Video | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    if (videoId) {
      getVideoDetails();
    }
  }, [videoId]);

  const getVideoDetails = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_BY_ID_API + videoId);
      const json = await data.json();
      if (json.items && json.items.length > 0) {
        setVideoInfo(json.items[0]);
      }
    } catch (error) {
      console.error("Failed to fetch video details:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full p-4 lg:px-8 gap-6 justify-center bg-white min-h-screen">
      {/* Left Column: Video & Details */}
      <div className="flex flex-col w-full lg:w-[800px] xl:w-[1000px]">
        {/* Video Player Box */}
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
          {videoId ? (
            <iframe
              className="w-full h-full"
              src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              Loading video...
            </div>
          )}
        </div>

        {/* Video Info Section */}
        <div className="mt-4">
          <h1 className="text-xl md:text-2xl font-bold line-clamp-2">
            {videoInfo?.snippet?.title || "Loading Title..."}
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-4">
            {/* Channel Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-gray-500 font-bold">
                  {videoInfo?.snippet?.channelTitle?.charAt(0) || "C"}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-[16px]">
                  {videoInfo?.snippet?.channelTitle || "Channel Name"}
                </h3>
                <p className="text-xs text-gray-500">Subscribers</p>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-full font-semibold ml-2 hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              <div className="flex bg-gray-100 rounded-full items-center">
                <button className="px-4 py-2 hover:bg-gray-200 rounded-l-full font-semibold border-r border-gray-300 flex items-center gap-2">
                  👍 {videoInfo?.statistics?.likeCount ? Number(videoInfo.statistics.likeCount).toLocaleString() : "Like"}
                </button>
                <button className="px-4 py-2 hover:bg-gray-200 rounded-r-full flex items-center gap-2">
                  👎
                </button>
              </div>
              <button className="bg-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 flex items-center gap-2">
                ↪ Share
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 hidden sm:flex items-center gap-2">
                ↓ Download
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-gray-100 p-4 rounded-xl mt-4 cursor-pointer hover:bg-gray-200 transition-colors text-sm">
            <div className="font-bold mb-1">
              {videoInfo?.statistics?.viewCount ? Number(videoInfo.statistics.viewCount).toLocaleString() : "..."} views
            </div>
            <p className="whitespace-pre-wrap line-clamp-3">
              {videoInfo?.snippet?.description || "Description not available..."}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <CommentsContainer />
        </div>
      </div>

      {/* Right Column: Live Chat/Suggestions */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        {/* Placeholder for Next Up / Up Next Videos */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
