import fs from 'fs';
import chalk from 'chalk';
import { Videogame } from '../interface/videogame.js';

const BASE_DIR = './data';

function getFilePath(user: string, id: number): string {
  return `${BASE_DIR}/${user}/${id}.json`;
}

function ensureUserDir(user: string): void {
  const dir = `${BASE_DIR}/${user}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function colorValue(value: number): string {
  if (value >= 60)      return chalk.green(String(value));
  else if (value >= 40) return chalk.yellow(String(value));
  else if (value >= 20) return chalk.magenta(String(value));
  else                  return chalk.red(String(value));
}

function printVideogame(vg: Videogame): void {
  console.log(`ID: ${vg.id}`);
  console.log(`Name: ${vg.name}`);
  console.log(`Description: ${vg.description}`);
  console.log(`Platform: ${vg.platform}`);
  console.log(`Genre: ${vg.genre}`);
  console.log(`Developer: ${vg.developer}`);
  console.log(`Year: ${vg.year}`);
  console.log(`Multiplayer: ${vg.multiplayer}`);
  console.log(`Estimated hours: ${vg.hours}`);
  console.log(`Market value: ${colorValue(vg.value)}`);
}

export function addVideogame(user: string, vg: Videogame): void {
  ensureUserDir(user);
  const path = getFilePath(user, vg.id);

  if (fs.existsSync(path)) {
    console.log(chalk.red(`Videogame already exists at ${user} collection!`));
    return;
  }

  fs.writeFileSync(path, JSON.stringify(vg, null, 2));
  console.log(chalk.green(`New videogame added to ${user} collection!`));
}

export function removeVideogame(user: string, id: number): void {
  const path = getFilePath(user, id);

  if (!fs.existsSync(path)) {
    console.log(chalk.red(`Videogame not found at ${user} collection!`));
    return;
  }

  fs.rmSync(path);
  console.log(chalk.green(`Videogame removed from ${user} collection!`));
}

export function updateVideogame(user: string, vg: Videogame): void {
  const path = getFilePath(user, vg.id);

  if (!fs.existsSync(path)) {
    console.log(chalk.red(`Videogame not found at ${user} collection!`));
    return;
  }

  fs.writeFileSync(path, JSON.stringify(vg, null, 2));
  console.log(chalk.green(`Videogame updated at ${user} collection!`));
}

export function readVideogame(user: string, id: number): void {
  const path = getFilePath(user, id);

  if (!fs.existsSync(path)) {
    console.log(chalk.red(`Videogame not found at ${user} collection!`));
    return;
  }

  const vg: Videogame = JSON.parse(fs.readFileSync(path, 'utf-8'));
  printVideogame(vg);
}

export function listVideogames(user: string): void {
  const dir = `${BASE_DIR}/${user}`;

  if (!fs.existsSync(dir)) {
    console.log(chalk.red(`No collection found for ${user}!`));
    return;
  }

  const files = fs.readdirSync(dir);

  if (files.length === 0) {
    console.log(chalk.red(`Collection is empty for ${user}!`));
    return;
  }

  console.log(chalk.green(`${user} videogame collection`));
  files.forEach((file) => {
    console.log('--------------------------------');
    const vg: Videogame = JSON.parse(
      fs.readFileSync(`${dir}/${file}`, 'utf-8')
    );
    printVideogame(vg);
  });
}