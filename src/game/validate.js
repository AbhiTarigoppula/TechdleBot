// Guess validation (issue #8).
import { ALLOWED_GUESSES, WORD_LENGTH } from "./words";

export const ERRORS = {
  NOT_TEXT: "Please enter a word.",
  WRONG_LENGTH: `Guesses must be exactly ${WORD_LENGTH} letters.`,
  NOT_LETTERS: "Guesses can only contain letters A-Z.",
  NOT_A_WORD: "That isn't in the word list.",
};

// Checks a raw guess in order: text, length, letters only, known word.
// Returns { valid: true, guess } (normalized to lowercase) or
// { valid: false, error } with a message safe to show the player.
export function validateGuess(raw, allowed = ALLOWED_GUESSES) {
  if (typeof raw !== "string") return { valid: false, error: ERRORS.NOT_TEXT };

  const guess = raw.trim().toLowerCase();
  if (guess.length === 0) return { valid: false, error: ERRORS.NOT_TEXT };
  if (guess.length !== WORD_LENGTH) {
    return { valid: false, error: ERRORS.WRONG_LENGTH };
  }
  if (!/^[a-z]+$/.test(guess)) {
    return { valid: false, error: ERRORS.NOT_LETTERS };
  }
  if (!allowed.has(guess)) return { valid: false, error: ERRORS.NOT_A_WORD };

  return { valid: true, guess };
}
