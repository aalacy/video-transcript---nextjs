export const dedupeArrayOfObjects = (items, key = "id") => {
  const uniqueIds = new Set();

  return items?.filter((element) => {
    const isDuplicate = uniqueIds.has(element[key]);

    uniqueIds.add(element[key]);

    return !isDuplicate;
  });
};
