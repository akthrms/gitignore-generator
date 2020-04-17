import * as fs from "fs";
import * as inquirer from "inquirer";

let choices: Array<String>;

try {
  choices = fs.readdirSync(`${__dirname}/../templates`);
} catch (e) {
  console.log("Error: Failed to Getting Templates");
  console.log(e);
  process.exit(1);
}

const currentWorkingDir = process.cwd();

console.log(`Start: Creating ${currentWorkingDir}/.gitignore`);

inquirer
  .prompt([
    {
      type: "list",
      name: "template",
      message: "Choose Template ?",
      choices: choices,
    },
  ])
  .then(({ template }) => {
    let text: Buffer;

    try {
      text = fs.readFileSync(`${__dirname}/../templates/${template}`);
    } catch (e) {
      console.log("Error: Failed to Reading a Template");
      console.log(e);
      process.exit(1);
    }

    try {
      fs.writeFileSync(`${currentWorkingDir}/.gitignore`, text);
    } catch (e) {
      console.log("Error: Failed to Create a File");
      console.log(e);
      process.exit(1);
    }
  })
  .finally(() => {
    console.log("Finish!");
  });
