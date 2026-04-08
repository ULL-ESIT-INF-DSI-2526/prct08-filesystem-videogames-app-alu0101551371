import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import {
  addVideogame,
  removeVideogame,
  updateVideogame,
  readVideogame,
  listVideogames,
} from "../src/manager/videogameManager.js";
import { Videogame } from "../src/interface/videogame.js";

const TEST_USER = "testUser";
const TEST_ID = 1;
const TEST_DIR = path.join(process.cwd(), "data", TEST_USER);
const TEST_FILE = path.join(TEST_DIR, `${TEST_ID}.json`);

describe("Videogame manager", () => {
  let testVideogame: Videogame;

  beforeEach(() => {
    testVideogame = {
      id: TEST_ID,
      name: "The Legend of Zelda: Breath of the Wild",
      description: "Open-world action-adventure game",
      platform: "Nintendo Switch",
      genre: "Aventura",
      developer: "Nintendo",
      year: 2017,
      multiplayer: false,
      hours: 50,
      value: 60,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it("deberia agregar un videojuego a la coleccion", () => {
    addVideogame(TEST_USER, testVideogame);

    expect(fs.existsSync(TEST_FILE)).toBe(true);
    const data: Videogame = JSON.parse(fs.readFileSync(TEST_FILE, "utf-8"));
    expect(data.name).toBe("The Legend of Zelda: Breath of the Wild");
  });

  it("deberia no agregar un videojuego si ya existe", () => {
    addVideogame(TEST_USER, testVideogame);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    addVideogame(TEST_USER, testVideogame);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Videogame already exists"),
    );
  });

  it("deberia actualizar un videojuego existente", () => {
    addVideogame(TEST_USER, testVideogame);
    const updated: Videogame = { ...testVideogame, name: "Zelda TOTK" };

    updateVideogame(TEST_USER, updated);

    const data: Videogame = JSON.parse(fs.readFileSync(TEST_FILE, "utf-8"));
    expect(data.name).toBe("Zelda TOTK");
  });

  it("deberia no actualizar un videojuego si no existe", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    updateVideogame(TEST_USER, testVideogame);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Videogame not found"),
    );
  });

  it("deberia eliminar un videojuego de la coleccion", () => {
    addVideogame(TEST_USER, testVideogame);

    removeVideogame(TEST_USER, TEST_ID);

    expect(fs.existsSync(TEST_FILE)).toBe(false);
  });

  it("deberia no eliminar un videojuego si no existe", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    removeVideogame(TEST_USER, TEST_ID);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Videogame not found"),
    );
  });

  it("deberia leer un videojuego existente", () => {
    addVideogame(TEST_USER, testVideogame);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    readVideogame(TEST_USER, TEST_ID);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Name: The Legend of Zelda: Breath of the Wild"),
    );
  });

  it("deberia no leer un videojuego si no existe", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    readVideogame(TEST_USER, TEST_ID);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Videogame not found"),
    );
  });

  it("deberia listar los videojuegos de un usuario", () => {
    addVideogame(TEST_USER, testVideogame);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    listVideogames(TEST_USER);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(`${TEST_USER} videogame collection`),
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Name: The Legend of Zelda: Breath of the Wild"),
    );
  });

  it("deberia mostrar mensaje si no existe la coleccion del usuario", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    listVideogames(TEST_USER);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("No collection found"),
    );
  });

  it("deberia mostrar mensaje si la coleccion esta vacia", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    listVideogames(TEST_USER);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Collection is empty"),
    );
  });

  it("deberia cubrir rama de valor medio (>=40)", () => {
    const videogame40: Videogame = { ...testVideogame, id: 2, value: 45 };
    addVideogame(TEST_USER, videogame40);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    readVideogame(TEST_USER, videogame40.id);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Market value:"),
    );
  });

  it("deberia cubrir rama de valor bajo (>=20)", () => {
    const videogame20: Videogame = { ...testVideogame, id: 3, value: 30 };
    addVideogame(TEST_USER, videogame20);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    readVideogame(TEST_USER, videogame20.id);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Market value:"),
    );
  });

  it("deberia cubrir rama de valor minimo (<20)", () => {
    const videogameMin: Videogame = { ...testVideogame, id: 4, value: 10 };
    addVideogame(TEST_USER, videogameMin);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    readVideogame(TEST_USER, videogameMin.id);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Market value:"),
    );
  });
});
