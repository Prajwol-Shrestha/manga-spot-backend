import { MangaItemWithVolumesDto, MangaStatus, ContentRating } from 'src/manga/dtos/manga-output.dto';

export const dummyMangaDetails: MangaItemWithVolumesDto = {
  id: '127820bd-8fc5-47b8-8782-e680317bf41d',
  type: 'manga',
  title: 'Boku wa Ohime-sama ni Narenai',
  description:
    'Shindou Rei (Cinderella) comes from a very poor family. Her only clothes are hand-me-downs from her brother, even her school uniform. So everyone always mistakes her for a boy. Even her close friend Hakuba Ouji (white horse prince), who starts developing confusing feelings toward her all the while believing she’s a boy. Tsukumo Yuki (Snow White) is the leader of a delinquent gang and falls in love with Rei at first sight, also believing her to be a boy.',
  lastVolume: '3',
  lastChapter: '30.1',
  tags: [
    {
      id: '423e2eae-a7a2-4a8b-ac03-a8351462d71d',
      type: 'tag',
      group: 'genre',
      name: 'Romance',
      description: '',
    },
  ],
  year: 2013,
  status: MangaStatus.COMPLETED,
  contentRating: ContentRating.SAFE,
  createdAt: "2018-11-16T06:35:01+00:00",
  updatedAt: "2022-02-19T22:31:01+00:00",
  author: '',
  artist: '',
  coverArt: '',
  volumes: [
    {
      volume: '1',
      chapters: [
        {
          chapter: '1',
          chapterId: '0aaf8b27-0013-4ae0-8935-91a089466874',
          isUnavailable: false,
        },
      ],
    },
  ],
  bookmarkedByMe: false,
};
