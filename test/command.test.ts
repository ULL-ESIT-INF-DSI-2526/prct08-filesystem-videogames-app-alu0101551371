import { beforeEach, describe, expect, it, vi } from "vitest";

const managerMocks = vi.hoisted(() => ({
  addVideogame: vi.fn(),
  removeVideogame: vi.fn(),
  updateVideogame: vi.fn(),
  readVideogame: vi.fn(),
  listVideogames: vi.fn(),
}));

vi.mock("../src/manager/videogameManager.js", () => managerMocks);

async function runCliWithArgs(args: string[]): Promise<void> {
  const originalArgv = process.argv;
  process.argv = ["node", "videogames-app", ...args];
  vi.resetModules();

  try {
    await import("../src/command/command.ts");
  } finally {
    process.argv = originalArgv;
  }
}

describe("CLI command", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deberia ejecutar add", async () => {
    await runCliWithArgs([
      "add",
      "--user",
      "alice",
      "--id",
      "1",
      "--name",
      "Hollow Knight",
      "--desc",
      "Metroidvania",
      "--platform",
      "PC",
      "--genre",
      "Aventura",
      "--developer",
      "Team Cherry",
      "--year",
      "2017",
      "--multiplayer",
      "false",
      "--hours",
      "30",
      "--value",
      "35",
    ]);

    expect(managerMocks.addVideogame).toHaveBeenCalledTimes(1);
  });

  it("deberia ejecutar update", async () => {
    await runCliWithArgs([
      "update",
      "--user",
      "alice",
      "--id",
      "1",
      "--name",
      "Hollow Knight Updated",
      "--desc",
      "Metroidvania",
      "--platform",
      "PC",
      "--genre",
      "Aventura",
      "--developer",
      "Team Cherry",
      "--year",
      "2018",
      "--multiplayer",
      "false",
      "--hours",
      "40",
      "--value",
      "45",
    ]);

    expect(managerMocks.updateVideogame).toHaveBeenCalledTimes(1);
  });

  it("deberia ejecutar remove", async () => {
    await runCliWithArgs(["remove", "--user", "alice", "--id", "1"]);

    expect(managerMocks.removeVideogame).toHaveBeenCalledWith("alice", 1);
  });

  it("deberia ejecutar read", async () => {
    await runCliWithArgs(["read", "--user", "alice", "--id", "1"]);

    expect(managerMocks.readVideogame).toHaveBeenCalledWith("alice", 1);
  });

  it("deberia ejecutar list", async () => {
    await runCliWithArgs(["list", "--user", "alice"]);

    expect(managerMocks.listVideogames).toHaveBeenCalledWith("alice");
  });
});
