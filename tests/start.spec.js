import { expect } from "chai";
import fs from "fs";
import os from "os";
import path from "path";
import { startGame } from "../src/game/start";
import { createGameStore } from "../src/game/store";
import { getDailyWord } from "../src/game/words";
import { submitGuess } from "../src/game/game";
import { handleStart } from "../src/events/interactionCreate";

describe("Techdle start", () => {
  const date = new Date("2026-10-27T12:00:00Z");
  it("creates today's tech puzzle with six attempts", () => {
    const result = startGame("alice", new Map(), date);
    expect(result.created).to.equal(true);
    expect(result.game.answer).to.equal(getDailyWord(date));
    expect(result.game.guesses).to.have.length(0);
    expect(result.game.maxAttempts).to.equal(6);
  });
  it("resumes progress and never replaces a completed game", () => {
    const store = new Map();
    const first = startGame("alice", store, date);
    const won = submitGuess(first.game, first.game.answer).game;
    store.set(first.key, won);
    const again = startGame("alice", store, date);
    expect(again.created).to.equal(false);
    expect(again.game).to.equal(won);
    expect(again.game.status).to.equal("won");
  });
  it("separates players and permits a new game at UTC midnight", () => {
    const store = new Map();
    const first = startGame("alice", store, date);
    expect(startGame("bob", store, date).created).to.equal(true);
    expect(startGame("alice", store, new Date("2026-10-27T23:59:59Z")).key).to.equal(first.key);
    expect(startGame("alice", store, new Date("2026-10-28T00:00:00Z")).created).to.equal(true);
  });
  it("retains the game after reopening the store", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "techdle-"));
    try {
      const filename = path.join(dir, "games.json");
      startGame("alice", createGameStore(filename), date);
      expect(startGame("alice", createGameStore(filename), date).created).to.equal(false);
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  });
  it("handles /techdle privately without revealing the answer", async () => {
    const replies = [];
    const client = { techdleGames: new Map() };
    const interaction = {
      isChatInputCommand: () => true, commandName: "techdle",
      user: { id: "alice" },
      deferReply: async options => { expect(options.ephemeral).to.equal(true); },
      editReply: async value => replies.push(value),
    };
    await handleStart(interaction, client);
    expect(replies[0].content).to.include("Techdle started!");
    expect(replies[0].content).not.to.include(getDailyWord());
    await handleStart(interaction, client);
    expect(replies[1].content).to.include("already active");
  });
  it("ignores unrelated commands and other interaction types", async () => {
    await handleStart({ isChatInputCommand: () => false }, {});
    await handleStart({ isChatInputCommand: () => true, commandName: "wordle" }, {});
  });
});
