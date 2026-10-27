import { expect } from "chai";
import { scoreGuess, formatFeedback, LETTER } from "../src/game/feedback";

const { CORRECT: G, PRESENT: Y, ABSENT: X } = LETTER;

describe("scoreGuess", () => {
  it("marks an exact match all correct", () => {
    expect(scoreGuess("array", "array")).to.deep.equal([G, G, G, G, G]);
  });

  it("marks letters that aren't in the word as absent", () => {
    expect(scoreGuess("cloud", "array")).to.deep.equal([X, X, X, X, X]);
  });

  it("marks right letters in the wrong spot as present", () => {
    // same letters as the answer, but none in the right spot
    expect(scoreGuess("stack", "tacks")).to.deep.equal([Y, Y, Y, Y, Y]);
  });

  it("mixes correct, present and absent", () => {
    // the r lines up (green); the a is elsewhere in the answer (yellow)
    expect(scoreGuess("crane", "array")).to.deep.equal([X, G, Y, X, X]);
  });

  it("doesn't mark an extra copy of a letter present when the answer has one", () => {
    // "stool" has one l: the first l in "hello" takes it, the second is absent
    expect(scoreGuess("hello", "stool")).to.deep.equal([X, X, Y, X, Y]);
    expect(scoreGuess("llama", "label")).to.deep.equal([G, Y, Y, X, X]);
  });

  it("gives green priority over an earlier yellow for the same letter", () => {
    // answer 'abbey': guess 'babes' -> first b is present, second b is correct
    expect(scoreGuess("babes", "abbey")).to.deep.equal([Y, Y, G, G, X]);
  });
});

describe("formatFeedback", () => {
  it("turns statuses into an emoji row", () => {
    expect(formatFeedback([G, Y, X, X, G])).to.equal("🟩🟨⬛⬛🟩");
  });
});
