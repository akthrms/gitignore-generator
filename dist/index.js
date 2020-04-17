"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const inquirer = __importStar(require("inquirer"));
let choices;
try {
    choices = fs.readdirSync(`${__dirname}/../templates`);
}
catch (e) {
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
    let text;
    try {
        text = fs.readFileSync(`${__dirname}/../templates/${template}`);
    }
    catch (e) {
        console.log("Error: Failed to Reading a Template");
        console.log(e);
        process.exit(1);
    }
    try {
        fs.writeFileSync(`${currentWorkingDir}/.gitignore`, text);
    }
    catch (e) {
        console.log("Error: Failed to Create a File");
        console.log(e);
        process.exit(1);
    }
})
    .finally(() => {
    console.log("Finish!");
});
//# sourceMappingURL=index.js.map