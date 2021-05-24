#!/usr/bin/env node
const cli = require("./utils/cli");
const performViewsCopy = require("./utils/performViewsCopy");
const performJSONCopy = require("./utils/performJSONcopy");
const getName = require("./utils/getName");
const init = require("./utils/init");
const question = require("./utils/question");
const { inDir, outDir } = require("./utils/paths");
const { inDir: inNew } = require("./utils/new-paths");
const performFSCopy = require("./utils/performFSCopy");
const { getCurrentFolderName } = require("./utils/getCurrentFolderName");
const { input, flags, showHelp } = cli;

const { json = false, auth = false, fs: isFullStack = false } = flags;

async function main() {
  init();
  if (input.includes("help")) {
    return showHelp(0);
  }

  let { name, issue } = getName(cli);

  if (!name) {
    name = await question({
      message: "Project name?",
      issue,
      name: "name",
      hint: "(This will be the name in package.json)",
    });
  }

  const newInDirPath = inNew({ ...flags, isFullStack });
  const outDirPath = outDir(name);

  if (name === ".") {
    name = getCurrentFolderName();
  }
  const vars = { name, body: "{{body}}", title: "{{title}}" };
  if (isFullStack) {
    return performFSCopy({ inDirPath: newInDirPath, outDirPath, vars });
  }
  if (json) {
    return performJSONCopy({ inDirPath: newInDirPath, outDirPath, vars });
  }
  return performViewsCopy({ inDirPath: newInDirPath, outDirPath, vars });
}

main();
