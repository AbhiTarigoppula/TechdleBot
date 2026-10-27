# Techdle start game (issue #7)

This branch is stacked on PR #21, which is stacked on PR #16. Merge those
dependencies first, then retarget the start-game PR to main. Do not copy their
game modules into a second implementation.

Run `npm ci` and `npm start` with the existing Discord TOKEN configuration.
Set CLIENT_ID (Discord application ID) and GUILD_ID (private test server ID)
in .env, then run `npm run register:techdle`. Send `/techdle`. The existing event
loader discovers the new interactionCreate handler automatically. This issue starts a game; it does not add
a guess command. Coordinate the interactionCreate dispatcher with issue #5 before team merge;
there should be one handler routing /techdle to this service, not two listeners
replying to the same interaction. Registration updates only /techdle and does
not remove other slash commands.

Proposed product rule for team approval: one game per Discord user per UTC day,
across servers. Repeated starts resume a playing game or report a finished game.
If the team chooses unlimited games, revise this rule before merging.

The service reuses getDailyWord/dayNumber from #16 and newGame from #21.
The existing answer pool is programming-themed. The existing validator still
accepts ordinary words as guesses; tech-only guesses would be a separate team
decision and word-list change.

Games default to data/techdle-games.json (ignored by git). Set TECHDLE_GAME_STORE
to override this path. Deploy one bot process and mount the data directory on
persistent storage; an ephemeral container filesystem loses games on replacement.
This file store is not suitable for multiple bot processes sharing a file.
Corrupt/unreadable files fail closed rather than silently resetting allowances.

Guess integration must use client.techdleGames.get(key), call submitGuess, and
save successful results using client.techdleGames.set(key, result.game).
Statistics should reuse this record rather than create another daily allowance.
Do not expose the stored answer in command replies.

Validation: npm test (40 passing); npm run build (successful).
Discord behavior tested with mocked messages, not a live bot/token.
