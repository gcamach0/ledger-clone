import arg from "arg";
import { registerAction } from "./actions/register.action";

export function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--file": String,
      "--sort": Boolean,
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return args;
}

export function callAction(options, data) {
  const argument = options._[0];

  if (argument === "register") {
    registerAction(data);
    return;
  }

  if (argument === "balance") {
    // Call balance controller
    // return;
  }
}

export function sortData(unsortedData) {
// sort data by date
}

export function validateOptions(options) {
  if (!options._[0]) {
    console.log("Please select the action you want to perform");
    return false;
  }
  if (!options["--file"]) {
    console.log(
      "Please provide the path of the file from which the report will be generated"
    );
    return false;
  }
  return true;
}
