export const getItemData = async () => {
  const response = await fetch("/itemData.txt");

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
  }

  const rawItemData = await response.text();

  const processedArray = [];

  const lines = rawItemData
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  lines.forEach((line) => {
    const firstColonIndex = line.indexOf(":");

    const restOfLine = line.substring(firstColonIndex + 1).trim();

    const secondColonIndex = restOfLine.indexOf(":");

    if (secondColonIndex === -1) {
      return;
    }

    const uniqueName = restOfLine.substring(0, secondColonIndex).trim();
    const displayName = restOfLine.substring(secondColonIndex + 1).trim();

    if (uniqueName && displayName) {
      processedArray.push({
        id: uniqueName,
        name: displayName,
      });
    }
  });

  return processedArray;
};
