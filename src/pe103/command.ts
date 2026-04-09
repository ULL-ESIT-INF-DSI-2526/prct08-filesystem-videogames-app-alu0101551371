import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  searchInDirectory,
  replaceInFile,
  generateReport,
} from "./agenteFicheros.js";

yargs(hideBin(process.argv))
  .command(
    "search <dir> <str>",
    "Search for a string in a directory",
    (yargs) => {
      return yargs
        .positional("dir", {
          describe: "Directory to search",
          type: "string",
        })
        .positional("str", {
          describe: "String to search for",
          type: "string",
        });
    },
    (argv) => {
      const matches = searchInDirectory(argv.dir as string, argv.str as string);
      console.log(matches);
    },
  )
  .command(
    "replace <file> <search> <replace>",
    "Replace a string in a file",
    (yargs) => {
      return yargs
        .positional("file", {
          describe: "File to modify",
          type: "string",
        })
        .positional("search", {
          describe: "String to replace",
          type: "string",
        })
        .positional("replace", {
          describe: "String to replace with",
          type: "string",
        });
    },
    (argv) => {
      replaceInFile(
        argv.file as string,
        argv.search as string,
        argv.replace as string,
      );
    },
  )
  .command(
    "report <dir> <str> <output>",
    "Generate a report of the search results",
    (yargs) => {
      return yargs
        .positional("dir", {
          describe: "Directory to analyze",
          type: "string",
        })
        .positional("str", {
          describe: "String to search for",
          type: "string",
        })
        .positional("output", {
          describe: "Output file for the report",
          type: "string",
        });
    },
    (argv) => {
      generateReport(
        argv.dir as string,
        argv.str as string,
        argv.output as string,
      );
    },
  )
  .demandCommand()
  .help().argv;
