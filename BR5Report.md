## Technical Debt and Code Smells

I looked at the code for `/techdle` and `/guess`. The command handler in `src/events/interactionCreate.js` starts games, handles guesses, accesses saved games, and builds the replies. The game rules are in separate files, which keeps those parts easier to find.

I found one confusing leftover in `src/game/words.js`: it defines an `ALLOWED_GUESSES` list, but `src/game/validate.js` does not use that list. Right now, `/guess` accepts any five letters, even if the word is not in the list. That is the current behavior, but the unused list could confuse someone working on the game later.

`src/game/validate.js` also defines three error names that all return the same message: “you need 5 letters.” This works, but having separate names for the same message is unnecessary and could be simplified.

The game store in `src/game/store.js` uses a JSON file and is designed for one running bot process. That is reasonable for the current setup, but running multiple bot processes could cause them to have different copies of the saved games.

## Cohesion and Coupling

I checked what each slash-command file does and counted its imports from other project files. The import count gives a simple comparison of how connected the files are.

| File | Main job | Project-file imports |
| --- | --- | ---: |
| `src/events/interactionCreate.js` | Handles `/techdle` and `/guess`, then connects Discord to the game code | 4 |
| `src/game/start.js` | Picks an answer and starts a game | 2 |
| `src/game/game.js` | Checks guesses and updates win/loss status | 2 |
| `src/game/store.js` | Saves and loads games | 0 |
| `src/game/feedback.js` | Checks letters and creates colored feedback | 0 |
| `src/game/validate.js` | Checks the guess format | 0 |

Most game files have one clear job, so they are easy to understand separately. `interactionCreate.js` has the most connections because it coordinates Discord, the game rules, and saved games. That makes it the most connected part of the slash-command feature, but it also makes sense for it to act as the command handler. The game logic uses simple game data and a store with `get` and `set` methods, which helps keep it separate from Discord and the JSON file.
