# Abhi - Use Case Diagram

```mermaid
usecase-beta
direction TB

actor Member("Discord member")
actor Operator("Bot operator")

systemBoundary "Discord bot"
  Welcome("Receive welcome message and meme")
  Expand("Send expand and receive DONG")
  StartWordle("Start game with !wordle")
  GuessWordle("Guess with !guess")
  StartTechdle("Start game with /techdle")
  GuessTechdle("Guess with /guess word")
  Register("Register slash commands")
  RunBot("Run the bot")
end

Member --> Welcome
Member --> Expand
Member --> StartWordle
Member --> GuessWordle
Member --> StartTechdle
Member --> GuessTechdle
Operator --> Register
Operator --> RunBot
```

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
