// Guess feedback (issue #11).

export const LETTER = {
  CORRECT: "correct", // right letter, right spot
  PRESENT: "present", // in the word, wrong spot
  ABSENT: "absent", // not in the word (or already used up)
};

const EMOJI = {
  [LETTER.CORRECT]: "🟩",
  [LETTER.PRESENT]: "🟨",
  [LETTER.ABSENT]: "⬛",
};

// Scores a guess against the answer, one status per letter.
// Duplicate letters follow the real Wordle rule: greens are claimed first,
// then yellows use up whatever copies of the letter are left.
export function scoreGuess(guess, answer) {
  const result = Array(guess.length).fill(LETTER.ABSENT);
  const remaining = {};

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = LETTER.CORRECT;
    } else {
      remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === LETTER.CORRECT) continue;
    if (remaining[guess[i]] > 0) {
      result[i] = LETTER.PRESENT;
      remaining[guess[i]]--;
    }
  }

  return result;
}

// Turns statuses into the emoji row shown to the player, e.g. 🟩⬛🟨⬛⬛.
export function formatFeedback(statuses) {
  return statuses.map((s) => EMOJI[s]).join("");
}
