export function buildMangaDexQueryParams(query: Record<string, any>) {
  const params = new URLSearchParams();

  for (const key in query) {
    const value = query[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        params.append(`${key}[]`, v); // 👈 convert back to includes[]
      });
    } else if (typeof value === 'object' && value !== null) {
      for (const subKey in value) {
        params.append(`${key}[${subKey}]`, value[subKey]);
      }
    } else if (value !== undefined) {
      params.append(key, value);
    }
  }

  return params;
}
