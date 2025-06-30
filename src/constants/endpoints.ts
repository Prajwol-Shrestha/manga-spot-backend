export const ENDPOINTS = {
  getAllMangas: '/manga',
  getMangaById: '/manga/:id',
  getMangaAggregate: '/manga/:id/aggregate', // for manga volumes and chapters
  getRandomManga: '/manga/random',
  getMangaTagList: '/manga/tag',

  getMangaFeed: '/manga/:id/feed',

  getChaptersList: '/chapter',

  getAllScanlationGroups: '/group',
  getScanlationGroupById: '/group/:id',
};
