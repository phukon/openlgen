#!/usr/bin/env node
import { Command } from 'commander';
import { autogen } from '../src/generate/gen.js';
import fs from 'fs';

const program = new Command();
const URL = 'https://api.github.com/licenses';

program
  .name('\n\nligen')
  .description('generate licenses for your project blazing fast')
  .version('0.8.0')
  .description('Automatically generate a license using the package.json file');

program.parse();

const generate = async () => {
  const autogenValues = await autogen({}, false);

  const { license, fullname } = autogenValues;

  try {
    const response = await fetch(`${URL}/${license}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const modifiedLicense = data.body
      .replace(/\[fullname\]/g, fullname)
      .replace(/\[year\]/g, new Date().getUTCFullYear());
    fs.writeFile('LICENSE', modifiedLicense, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('LICENSE generated!');
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log(`Generated License: ${license}`);
  console.log(`Fullname: ${fullname}`);
};

generate();
