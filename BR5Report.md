## Technical Debt and Code Smells

For this section, I focused on `/techdle` and `/guess`. `src/events/interactionCreate.js` handles both commands. It starts games, handles guesses, accesses saved games, and builds the replies. The actual game rules are in separate files, which makes those parts easier to find and understand.

One confusing part is the `ALLOWED_GUESSES` list in `src/game/words.js`. The comments describe it as the words the bot accepts, but `src/game/validate.js` does not check that list. Instead, it removes spaces from the beginning and end, converts the guess to lowercase, and checks that it contains exactly five letters from a to z. Accepting guesses outside the list is the current rule, so this is not a gameplay bug. However, the comments and list could mislead someone changing the code. They should be updated to make the rule clear.

`src/game/validate.js` also defines three error names with the same message, “you need 5 letters.” One of them, `NOT_LETTERS`, is never used in the validator. Different error names can be useful, but this unused one adds confusion. It could be removed, or the validator could use it to distinguish letters from other characters.

Another limitation is how games are saved. `src/game/store.js` keeps a copy of the games in memory and writes them to a JSON file. It is designed for one running bot process. If multiple processes used the same file, they could have outdated copies and overwrite each other's updates. This is a concern for expanding the bot, rather than proof that the current setup is failing. For now, the deployment should use one process. Supporting multiple processes would require storage that handles their updates safely.

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
