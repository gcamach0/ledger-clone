import fs from "fs";
import path from "path";

export function readJournalFile(location) {
  try {
    const rawData = fs.readFileSync(location, "utf-8");
    
    let linesOfContent = rawData.split("\n");

    if (linesOfContent[0].startsWith("!include")) {
      linesOfContent = readIndexFile(linesOfContent, location);
    }

    return linesOfContent;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function readIndexFile(index, indexLocation) {
  const linesOfContent = [];
  index.forEach((line) => {
    if (!line) return;
    const fileName = line.split(" ")[1];
    const baseLocation = path.dirname(indexLocation);
    const fileLocation = path.join(baseLocation, fileName);
    linesOfContent.push(...readJournalFile(fileLocation));
  });
  return linesOfContent;
}
