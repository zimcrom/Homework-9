const fs = require("fs");
const inquirer = require('inquirer');
const generateMarkdown = require("./utils/generateMarkdown.js");
const api = require("./utils/api");
const path = require("path");

const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How do I install this project?',
        default: 'npm i',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How should I use the repo?',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How should I contribute to this repo?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'How should I run tests for this project?',
        default: 'npm test',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Are there any licenses for this project?',
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    }
];
function writeFunction(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data, function (err) {
        if (err) return console.log(err)
    });
};


function init() {
    inquirer.prompt(questions).then(answers => {
        console.log(answers);
    
    api
            .getUser(answers.github)
            .then(({ data }) => {
                writeFunction("README.md", generateMarkdown({ ...answers, ...data }));
            })
        });
    };


init();
