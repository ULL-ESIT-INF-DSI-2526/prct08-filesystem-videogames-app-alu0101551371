import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  addVideogame,
  removeVideogame,
  updateVideogame,
  readVideogame,
  listVideogames,
} from '../manager/videogameManager.js';
import { Genre, Platform } from '../interface/videogame.js';

const videogameOptions = {
  name:        { type: 'string'  as const, demandOption: true, description: 'Videogame name' },
  desc:        { type: 'string'  as const, demandOption: true, description: 'Description' },
  platform:    { type: 'string'  as const, demandOption: true, description: 'Platform' },
  genre:       { type: 'string'  as const, demandOption: true, description: 'Genre' },
  developer:   { type: 'string'  as const, demandOption: true, description: 'Developer' },
  year:        { type: 'number'  as const, demandOption: true, description: 'Release year' },
  multiplayer: { type: 'boolean' as const, demandOption: true, description: 'Has multiplayer?' },
  hours:       { type: 'number'  as const, demandOption: true, description: 'Estimated hours' },
  value:       { type: 'number'  as const, demandOption: true, description: 'Market value' },
};

yargs(hideBin(process.argv))
  .command('add', 'Add a videogame to the collection', {
    user: { type: 'string' as const, demandOption: true, description: 'Username' },
    id:   { type: 'number' as const, demandOption: true, description: 'Videogame ID' },
    ...videogameOptions,
  }, (argv) => {
    addVideogame(argv.user as string, {
      id:          argv.id as number,
      name:        argv.name as string,
      description: argv.desc as string,
      platform:    argv.platform as Platform,
      genre:       argv.genre as Genre,
      developer:   argv.developer as string,
      year:        argv.year as number,
      multiplayer: argv.multiplayer as boolean,
      hours:       argv.hours as number,
      value:       argv.value as number,
    });
  })
  .command('remove', 'Remove a videogame from the collection', {
    user: { type: 'string' as const, demandOption: true },
    id:   { type: 'number' as const, demandOption: true },
  }, (argv) => {
    removeVideogame(argv.user as string, argv.id as number);
  })
  .command('update', 'Update a videogame in the collection', {
    user: { type: 'string' as const, demandOption: true },
    id:   { type: 'number' as const, demandOption: true },
    ...videogameOptions,
  }, (argv) => {
    updateVideogame(argv.user as string, {
      id:          argv.id as number,
      name:        argv.name as string,
      description: argv.desc as string,
      platform:    argv.platform as Platform,
      genre:       argv.genre as Genre,
      developer:   argv.developer as string,
      year:        argv.year as number,
      multiplayer: argv.multiplayer as boolean,
      hours:       argv.hours as number,
      value:       argv.value as number,
    });
  })
  .command('read', 'Read a specific videogame', {
    user: { type: 'string' as const, demandOption: true },
    id:   { type: 'number' as const, demandOption: true },
  }, (argv) => {
    readVideogame(argv.user as string, argv.id as number);
  })
  .command('list', 'List all videogames of a user', {
    user: { type: 'string' as const, demandOption: true },
  }, (argv) => {
    listVideogames(argv.user as string);
  })
  .help()
  .argv;