function generateProjectUrl(github, projectName) {
  const kebabCaseProjectName = projectName.toLowerCase().split(" ").join("-");
  return `https://github.com/${github}/${kebabCaseProjectName}`;
}

function renderLicenseBadge(license, github, projectName) {
  if (license !== "None") {
    return `[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](${generateProjectUrl(github, projectName)})`
  }
  return ''
}

function renderLicenseSection(license) {
  if (license !== "None") {
    return (
      `## License

This project is licensed under the ${license} license.`
    )
  }
  return ''
}

function generateMarkdown(data) {
  return `
# ${data.projectName}
${renderLicenseBadge(data.license, data.github, data.projectName)}

## Description

${data.description}

## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:

\`\`\`
${data.installation}
\`\`\`

## Usage

${data.usage}

${renderLicenseSection(data.license)}
  
## Contributing

${data.contributing}

## Tests

To run tests, run the following command:

\`\`\`
${data.tests}
\`\`\`

## Questions

<img src="${data.avatar_url}" alt="avatar" style="border-radius: 15px" width="25" />

If you have any questions about the repo, open an issue or contact [${data.github}](${data.url}) directly at ${data.email}.

`;
}

module.exports = generateMarkdown;

