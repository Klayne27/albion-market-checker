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

    const restOfLine = line.substring(firstColonIndex + 1).trim(); // e.g T4_BAG            : Adept's Bag

    const secondColonIndex = restOfLine.indexOf(":");

    if (secondColonIndex === -1) {
      return; // Skip lines that don't have the second colon
    }

    const uniqueName = restOfLine.substring(0, secondColonIndex).trim(); // Extract unique name
    const displayName = restOfLine.substring(secondColonIndex + 1).trim(); // Extract human readable name

    if (uniqueName && displayName) {
      processedArray.push({
        id: uniqueName, // id for uniqueName
        name: displayName, // name for displayName (human readable name)
      });
    }
  });

  return processedArray;
};
