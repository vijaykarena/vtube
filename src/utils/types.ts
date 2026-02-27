export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface Snippet {
  channelTitle: string;
  title: string;
  description: string;
  thumbnails: {
    medium: Thumbnail;
    high?: Thumbnail;
    default?: Thumbnail;
  };
}

export interface Statistics {
  viewCount: string;
  likeCount?: string;
  commentCount?: string;
}

export interface Video {
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}
