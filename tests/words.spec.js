import { expect } from "chai";
import {
  ANSWERS,
  ALLOWED_GUESSES,
  WORD_LENGTH,
  dayNumber,
  getDailyWord,
} from "../src/game/words";

describe("word lists", () => {
  it("only contains 5-letter lowercase words", () => {
    for (const w of ALLOWED_GUESSES) {
      expect(w).to.match(/^[a-z]{5}$/, w);
      expect(w.length).to.equal(WORD_LENGTH);
    }
  });

  it("has no duplicate answers", () => {
    expect(new Set(ANSWERS).size).to.equal(ANSWERS.length);
  });

  it("accepts every answer as a guess", () => {
    for (const w of ANSWERS) expect(ALLOWED_GUESSES.has(w)).to.equal(true);
  });
});

describe("getDailyWord", () => {
  it("returns the same word all day, whatever the time", () => {
    const a = getDailyWord(new Date("2026-10-21T00:00:01Z"));
    const b = getDailyWord(new Date("2026-10-21T23:59:59Z"));
    expect(a).to.equal(b);
  });

  it("changes at midnight UTC", () => {
    const a = getDailyWord(new Date("2026-10-21T23:59:59Z"));
    const b = getDailyWord(new Date("2026-10-22T00:00:00Z"));
    expect(a).to.not.equal(b);
  });

  it("always returns an answer from the list", () => {
    for (let d = 0; d < 1000; d++) {
      const date = new Date(Date.UTC(2026, 0, 1 + d));
      expect(ANSWERS).to.include(getDailyWord(date));
    }
  });

  it("walks the whole list before repeating", () => {
    const seen = new Set();
    for (let d = 0; d < ANSWERS.length; d++) {
      seen.add(getDailyWord(new Date(Date.UTC(2026, 0, 1 + d))));
    }
    expect(seen.size).to.equal(ANSWERS.length);
  });

  it("starts at the first answer on the epoch day", () => {
    expect(dayNumber(new Date("2026-01-01T12:00:00Z"))).to.equal(0);
    expect(getDailyWord(new Date("2026-01-01T12:00:00Z"))).to.equal(ANSWERS[0]);
  });

  it("handles dates before the epoch", () => {
    expect(ANSWERS).to.include(getDailyWord(new Date("2025-06-15T00:00:00Z")));
  });

  it("accepts a custom answer list", () => {
    expect(getDailyWord(new Date("2026-01-02T00:00:00Z"), ["crane", "slate"])).to.equal("slate");
  });
});
