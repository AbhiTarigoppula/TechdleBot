# Abhi - Use Case Diagram

```mermaid
usecase-beta
direction LR
actor Player
actor Maintainer("Bot operator")
systemBoundary Techdle("Techdle Bot")
  StartGame("Start or restart a game with /techdle")
  Guess("Submit a guess with /guess word")
  ViewResult("See colored feedback and game result")
  Register("Register /techdle and /guess")
end
Player --> StartGame
Player --> Guess
Player --> ViewResult
Maintainer --> Register
```

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
