# Techdle start game (issue #7)

Every /techdle invocation creates a fresh game with six attempts and a random
answer from the programming-themed ANSWERS list. It replaces the user's active
game, including an unfinished one. The immediately previous answer is excluded
so the next game has a different word. Older words can repeat later.

Run npm ci, add TOKEN, CLIENT_ID (application ID) and GUILD_ID (test server ID)
to .env, then run npm run register:techdle and npm start. Only the named guild
command is updated; other commands are not deleted. The existing event loader
loads interactionCreate automatically. Coordinate this handler with issue #5
so only one dispatcher responds to /techdle. Guess submission is not included.

Games are stored under the Discord user ID, across servers. Guess integration
must load client.techdleGames.get(interaction.user.id), call submitGuess, and
save successful results with client.techdleGames.set(interaction.user.id, result.game).
Do not use the previous user:UTC-day key. Old daily records are not resumed.
Stats (#12) must record results before a new start replaces a completed game;
this active-game store is not a statistics history.

The default file is data/techdle-games.json (ignored by git); TECHDLE_GAME_STORE
can override it. Deploy a single bot process with persistent storage mounted.
An ephemeral filesystem loses games on replacement. This file store does not
support multiple processes sharing the file. Stored answers stay out of replies.

This change reuses ANSWERS from #16 and newGame from #21. It does not change
the shared daily-word helper or guess validation. Ordinary words remain valid
guesses. Issue #6 and #16's daily-word description conflict with the new game
rule and need team updates. Issue #1 has a comment about another rules
implementation in a teammate's personal repo; coordinate that integration.

PR #21 merged into #16's branch before #22 merged into #21's branch. The team
must propagate the later start-game changes through the remaining integration;
merging #16 alone does not necessarily include them. Main currently lacks them.

Validation: npm test (43 passing); npm run build. Live Discord testing remains
required: repeated starts, reset attempts, private replies, restart persistence.
