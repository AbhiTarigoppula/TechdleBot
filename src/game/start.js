import { randomInt } from "crypto";
import { ANSWERS } from "./words";
import { newGame } from "./game";

// One active game per Discord user, shared across servers. Every start replaces
// that user's previous game. An injected picker keeps tests deterministic.
export function startGame(userId, store, pickIndex = randomInt) {
  const key = userId;
  const previous = store.get(key);
  // A new game gets a different answer from the user's previous game.
  const choices = ANSWERS.filter(word => word !== previous?.answer);
  const game = newGame(choices[pickIndex(choices.length)]);
  store.set(key, game);
  return { key, created: true, game };
}
