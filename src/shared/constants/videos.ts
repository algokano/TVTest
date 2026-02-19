export interface VideoMeta {
  id: string;
  title: string;
  url: string;
  episodeNumber: number;
  showTitle: string;
  totalEpisodes: number;
}

export const orderedVideos: VideoMeta[] = [
  {
    id: 'video-1',
    title: "I'm Obsessed With My Boss Part I - 16",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/I'm%20Obsessed%20With%20My%20Boss%20Part%20I/en/2024-05-23%2012:01:51/16_.m3u8",
    episodeNumber: 16,
    showTitle: "I'm Obsessed With My Boss Part I",
    totalEpisodes: 63,
  },
  {
    id: 'video-2',
    title: "I'm Obsessed With My Boss Part I - 17",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/I'm%20Obsessed%20With%20My%20Boss%20Part%20I/en/2024-05-23%2012:01:51/17_.m3u8",
    episodeNumber: 17,
    showTitle: "I'm Obsessed With My Boss Part I",
    totalEpisodes: 63,
  },
  {
    id: 'video-3',
    title: "I'm Obsessed With My Boss Part I - 37",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/I'm%20Obsessed%20With%20My%20Boss%20Part%20I/en/2024-05-23%2012:01:51/37_.m3u8",
    episodeNumber: 37,
    showTitle: "I'm Obsessed With My Boss Part I",
    totalEpisodes: 63,
  },
  {
    id: 'video-4',
    title: "I'm Obsessed With My Boss Part I - 18",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/I'm%20Obsessed%20With%20My%20Boss%20Part%20I/en/2024-05-23%2012:01:51/18_.m3u8",
    episodeNumber: 18,
    showTitle: "I'm Obsessed With My Boss Part I",
    totalEpisodes: 63,
  },
  {
    id: 'video-5',
    title: "I'm Obsessed With My Boss Part I - 30",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/I'm%20Obsessed%20With%20My%20Boss%20Part%20I/en/2024-05-23%2012:01:51/30_.m3u8",
    episodeNumber: 30,
    showTitle: "I'm Obsessed With My Boss Part I",
    totalEpisodes: 63,
  },
];

export const videoById = orderedVideos.reduce<Record<string, VideoMeta>>(
  (acc, video) => {
    acc[video.id] = video;
    return acc;
  },
  {},
);
