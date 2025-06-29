export function buildQueryParams(
  input: Record<string, any>,
): Record<string, any> {
  const params: Record<string, any> = {};

  for (const key in input) {
    const value = input[key];

    if (value === undefined || value === null) continue;

    // Handle arrays (e.g. status[])
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (!params[`${key}[]`]) {
          params[`${key}[]`] = [];
        }
        params[`${key}[]`].push(v);
      });
    }

    // Handle nested objects (e.g. order[title]=asc)
    else if (typeof value === 'object' && !Array.isArray(value)) {
      for (const nestedKey in value) {
        params[`${key}[${nestedKey}]`] = value[nestedKey];
      }
    }

    // Handle primitive values
    else {
      params[key] = value;
    }
  }

  return params;
}
