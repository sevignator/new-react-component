#!/usr/bin/env node

import { Option, program } from 'commander';
import { createBoilerplate, createConfig, getOptions } from './helpers.js';
import { parseJSONFile } from './utils.js';

const { description, version } = await parseJSONFile('../package.json');
const langOptions = ['js', 'ts'];
const stylingOptions = ['vanilla-extract'];

program.version(version).description(description);

program.command('init').description('Create a custom config file');

program
  .command('create')
  .description('Create a new component')
  .argument('<component-name>', "New component's name")
  .addOption(new Option('-d, --dir <path>', 'Specify an output directory'))
  .addOption(
    new Option('-l, --lang <language>', 'Specify a language to use').choices(
      langOptions
    )
  )
  .addOption(
    new Option('-s, --styling <library>', 'Specify a styling library').choices(
      stylingOptions
    )
  );

program.parse();

const command = program.args[0];

if (command === 'init') {
  createConfig();
}

if (command === 'create') {
  const options = program.opts();
  const { dir, lang, styling } = await getOptions(options);
  const componentName = program.args[1];
  const componentDirectory = `${dir}/${componentName}`;

  createBoilerplate(componentName, componentDirectory, lang, styling);
}
