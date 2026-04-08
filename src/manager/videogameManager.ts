import fs from "fs";
import chalk from "chalk";
import { Videogame } from "../interface/videogame.js";

const BASE_DIR = "./data";

/**
 * Función para obtener la ruta del archivo de un videojuego dado el usuario y el ID. 
 * Si el archivo no existe, se creará automáticamente al agregar un nuevo videojuego.
 * @param user Nombre del usuario al que pertenece la colección de videojuegos
 * @param id Identificador único del videojuego dentro de la colección del usuario
 * @returns Ruta del archivo del videojuego
 */
function getFilePath(user: string, id: number): string {
  return `${BASE_DIR}/${user}/${id}.json`;
}

/**
 * Función para asegurar que el directorio del usuario exista. Si no existe, se crea automáticamente.
 * @param user Nombre del usuario al que pertenece la colección de videojuegos
 */
function ensureUserDir(user: string): void {
  const dir = `${BASE_DIR}/${user}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Función para colorear el valor de mercado del videojuego según su rango.
 * @param value Valor de mercado del videojuego
 * @returns Color del valor formateado como string
 */
function colorValue(value: number): string {
  if (value >= 60) return chalk.green(String(value));
  else if (value >= 40) return chalk.yellow(String(value));
  else if (value >= 20) return chalk.magenta(String(value));
  else return chalk.red(String(value));
}

/**
 * Función para imprimir los detalles de un videojuego en la consola de forma formateada.
 * @param vg Videojuego a imprimir
 */
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

/**
 * Función para agregar un nuevo videojuego a la colección de un usuario. 
 * Si el videojuego ya existe, se muestra un mensaje de error.
 * @param user Nombre del usuario al que pertenece la colección de videojuegos
 * @param vg Videojuego a agregar a la colección del usuario
 */
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

/**
 * Función para eliminar un videojuego de la colección de un usuario. 
 * Si el videojuego no existe, se muestra un mensaje de error.
 * @param user Nombre del usuario al que pertenece la colección de videojuegos
 * @param id Identificador único del videojuego dentro de la colección del usuario
 */
export function removeVideogame(user: string, id: number): void {
  const path = getFilePath(user, id);

  if (!fs.existsSync(path)) {
    console.log(chalk.red(`Videogame not found at ${user} collection!`));
    return;
  }

  fs.rmSync(path);
  console.log(chalk.green(`Videogame removed from ${user} collection!`));
}

/**
 * Función para actualizar los detalles de un videojuego existente en la colección de un usuario. 
 * Si el videojuego no existe, se muestra un mensaje de error.
 * @param user Nombre del usuario al que pertenece la colección de videojuegos
 * @param vg Videojuego con los detalles actualizados a actualizar en la colección del usuario
 */
export function updateVideogame(user: string, vg: Videogame): void {
  const path = getFilePath(user, vg.id);

  if (!fs.existsSync(path)) {
    console.log(chalk.red(`Videogame not found at ${user} collection!`));
    return;
  }

  fs.writeFileSync(path, JSON.stringify(vg, null, 2));
  console.log(chalk.green(`Videogame updated at ${user} collection!`));
}

/**
 * Función para leer los detalles de un videojuego en la colección de un usuario.
 * @param user Nombre del usuario al que pertenece la colección de videojuegos
 * @param id Identificador único del videojuego dentro de la colección del usuario
 */
export function readVideogame(user: string, id: number): void {
  const path = getFilePath(user, id);

  if (!fs.existsSync(path)) {
    console.log(chalk.red(`Videogame not found at ${user} collection!`));
    return;
  }

  const vg: Videogame = JSON.parse(fs.readFileSync(path, "utf-8"));
  printVideogame(vg);
}

/**
 * Función para listar todos los videojuegos en la colección de un usuario. 
 * Si el usuario no tiene colección o la colección está vacía, se muestra un mensaje de error.
 * @param user Nombre del usuario al que pertenece la colección de videojuegos
 */
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
    console.log("--------------------------------");
    const vg: Videogame = JSON.parse(
      fs.readFileSync(`${dir}/${file}`, "utf-8"),
    );
    printVideogame(vg);
  });
}
