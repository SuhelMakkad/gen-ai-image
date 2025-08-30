export const headersToObject = (headers: Headers) => {
  const values = {} as Record<string, string>;
  headers.forEach((value, key) => {
    values[key] = value;
  });

  return values;
};
