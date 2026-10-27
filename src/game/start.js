import { dayNumber, getDailyWord } from "./words";
import { newGame } from "./game";

// Shared by message commands and the future slash-command handler.
// Store entries are keyed by Discord user and UTC puzzle day, across servers.
export function startGame(userId, store, date = new Date()) {
  const key = `${userId}:${dayNumber(date)}`;
  const existing = store.get(key);
  if (existing) return { key, created: false, game: existing };

  const game = newGame(getDailyWord(date));
  store.set(key, game);
  return { key, created: true, game };
}
