import { parseArgumentsIntoOptions } from "./arguments";
import { callAction } from "./arguments";
import { validateOptions } from "./arguments";
import { readJournalFile } from "./fileReader";
import { parseRawContent } from "./parseContent";

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (!validateOptions(options)) return;
  const data = readJournalFile(options["--file"]);
  console.log('data :>> ', data);
  parseRawContent(data);
  callAction(options);
}
