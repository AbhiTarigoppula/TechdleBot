## Technical Debt and Code Smells

I looked at the code for `/techdle` and `/guess`. `src/events/interactionCreate.js` handles both commands. It starts games, handles guesses, loads and saves games, and builds the replies. The game rules are in separate files, which makes them easier to find.

`src/game/words.js` defines an `ALLOWED_GUESSES` list, but `src/game/validate.js` does not use it. Right now, `/guess` accepts any five letters from a to z, even if the guess is not in the list. That is the current behavior, but the unused list could confuse someone working on the code later.

`src/game/validate.js` also defines three error names with the same message, “you need 5 letters.” The code uses two of those names; the third is unused. This could be simplified.

`src/game/store.js` saves games in a JSON file and is designed for one running bot process. If multiple bot processes ran at the same time, each could have an outdated copy of the game data and overwrite another process’s updates.

## Cohesion and Coupling

Cohesion is about how closely a file's responsibilities fit together. Coupling is about how much it depends on other parts of the program. I checked each file's responsibilities and counted its direct imports from other project files. I did not count Node.js modules or packages such as Discord.js. These counts show some of the connections, but they do not measure every dependency.

| File | Main job | Imports from other project files |
| --- | --- | ---: |
| `src/commands/techdle.js` | Defines `/techdle` and `/guess` | 0 |
| `src/registerTechdle.js` | Registers the commands with Discord | 1 |
| `src/events/interactionCreate.js` | Handles commands and connects Discord to the game code | 4 |
| `src/game/start.js` | Picks an answer and starts a game | 2 |
| `src/game/game.js` | Processes guesses and updates win/loss status | 2 |
| `src/game/store.js` | Saves and loads games | 0 |
| `src/game/feedback.js` | Scores letters and creates colored feedback | 0 |
| `src/game/validate.js` | Checks the guess format | 0 |
| `src/game/words.js` | Holds the answer and guess lists | 0 |

Most of these files have good cohesion because they focus on one main job. For example, `validate.js` checks input, while `store.js` handles saving and loading. This makes it easier to change one part without working through unrelated code.

`interactionCreate.js` has the most direct project imports in this group. That makes sense because it connects the commands to the game rules and storage. It also builds the replies and handles errors, so it is the file most likely to grow as more commands are added. If that happens, moving reply formatting or individual command handling into separate functions could make it easier to manage.

The core game rules do not import Discord.js or perform file operations. Also, `startGame` accepts a store with `get` and `set` methods, so it can work with a map during testing. This helps keep the game rules separate from Discord and the JSON storage.
