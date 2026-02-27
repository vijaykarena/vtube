import type { Video } from "../utils/types";

const VideoCard = ({ info }: { info: Video }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="w-full cursor-pointer flex flex-col gap-2 mb-4 group">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          alt="thumbnail"
          src={thumbnails.medium.url}
        />
      </div>
      <div className="flex gap-3 mt-1 pr-4">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
            {channelTitle.charAt(0)}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-[16px] leading-tight line-clamp-2 text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-[14px] text-gray-600 group-hover:text-gray-900">
            {channelTitle}
          </p>
          <p className="text-[14px] text-gray-600">
            {statistics.viewCount} views • 1 day ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
