#!/usr/bin/env node
import select, { Separator } from '@inquirer/select';
import input from '@inquirer/input';
import confirm from '@inquirer/confirm';
import pc from 'picocolors';
import fs from 'fs';
import { autogen } from './gen.js';

const URL = 'https://api.github.com/licenses';
const entries = {};
const ghdata = [];
let licenses = [];
let isSuccess = false;
let flag = false;

const replacePlaceholders = (text, fullname, year) => {
  return text.replace(/\[fullname\]/g, fullname).replace(/\[year\]/g, year);
};

const modifyPackageJson = (newLicense, newAuthor) => {
  const packageJsonPath = 'package.json';
  try {
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.license = newLicense;

      if (newAuthor) {
        packageJson.author = newAuthor;
      }

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('package.json updated successfully!');
    } else {
      console.log('package.json does not exist. Skipping modification.');
    }
  } catch (error) {
    console.error('Error modifying package.json:', error);
    process.exit(1);
  }
};


const fetchData = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    data.forEach((entry) => {
      ghdata.push({
        name: entry.spdx_id,
        value: entry.spdx_id,
        description: entry.name,
      });
    });
    licenses = ghdata.map((entry) => entry);
    isSuccess = true;
  } catch (error) {
    console.log('Please check your network connectivity', error);
  }
};

const autoGeneration = async () => {
  console.log(pc.bold(pc.blue('Reading package.json...')));
  const autogenValues = await autogen(entries, flag);
  entries.license = autogenValues.license;
  entries.fullname = autogenValues.fullname;
  flag = autogenValues.flag;
};

const customLicenseSelection = async () => {
  const lcs = await select({
    message: 'Select license',
    choices: [...licenses, new Separator()],
  });
  entries.license = lcs;

  if (
    ['BSD-2-Clause', 'BSD-3-Clause', 'MIT', 'ISC'].includes(entries.license)
  ) {
    flag = true;
  }

  if (flag) {
    let nameAnswer;
    do {
      nameAnswer = await input({ message: 'Enter your name:' });
      if (typeof nameAnswer !== 'string' || nameAnswer.trim().length < 1) {
        console.log('Invalid name. Please enter a valid name!');
      }
    } while (typeof nameAnswer !== 'string' || nameAnswer.trim().length < 1);

    entries.fullname = nameAnswer;

    let dateAnswer;
    const dateRegex = /^\d{4}$/;
    do {
      dateAnswer = await input({
        message: 'Enter the year (leave it blank to auto-generate):',
      });
      if (!dateRegex.test(dateAnswer) && dateAnswer.trim() !== '') {
        console.log(
          'Invalid date. Please enter a valid date in YYYY format (leave it blank): '
        );
      }
    } while (!dateRegex.test(dateAnswer) && dateAnswer.trim() !== '');

    entries.date =
      dateAnswer.trim() === '' ? new Date().getUTCFullYear() : dateAnswer;
  }
};

const generateLicense = async (options = {}) => {
  const { license, fullname, flag } = options;

  flag
    ? console.log(`\nLicense: ${license}\nName: ${fullname}`)
    : console.log(`\nLicense: ${license}`);

  const check = await confirm({ message: 'Continue?' });
  if (check) {
    try {
      const response = await fetch(`${URL}/${license}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const modifiedLicense = replacePlaceholders(
        data.body,
        entries.fullname,
        entries.date || new Date().getUTCFullYear()
      );
      fs.writeFile('LICENSE', modifiedLicense, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('LICENSE generated!');
        }
      });
      modifyPackageJson(license, fullname);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};

const askOptions = async () => {
  try {
    await fetchData();

    if (isSuccess) {
      const answer = await select({
        message: 'Select an option',
        choices: [
          {
            name: 'Auto',
            value: 'auto',
            description:
              'Automatically generate a license using values from the package.json',
          },
          {
            name: 'Custom',
            value: 'custom',
            description: 'Build your license yourself',
          },
        ],
      });

      if (answer === 'auto') {
        await autoGeneration();
      } else if (answer === 'custom') {
        await customLicenseSelection();
      }

      await generateLicense({
        license: entries.license,
        fullname: entries.fullname,
        flag,
      });
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

askOptions();
