# My Techdle feature

This diagram shows how my `/techdle` and `/guess` commands use the game code and saved game file.

```mermaid
flowchart TD
    A[Player runs /techdle] --> B[Bot picks a tech word different from the last one and starts six tries]
    B --> C[Save game under player's Discord ID]
    D[Player runs /guess word] --> E[Load that player's saved game]
    C --> E
    E --> F[For a valid guess, score it and save the update]
    F --> G[Send private colors and game result]
```

Each player has one current game. Starting `/techdle` again replaces that player's game. Guesses must be five letters; any five-letter guess is scored, without checking a word list. Invalid guesses use no attempt.

**Code:** `src/events/interactionCreate.js` handles commands and replies; `src/game/` contains the rules and feedback; `src/game/store.js` saves games; and `src/game/words.js` provides tech answers.
