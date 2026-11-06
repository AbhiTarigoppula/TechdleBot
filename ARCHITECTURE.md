
# TechdleBot Use Case Diagram

```mermaid
usecase-beta
direction TB

actor Player

systemBoundary "TechdleBot"
  StartGame("Start or reset game with /techdle")
  SubmitGuess("Submit a five-letter guess with /guess")
end

Player --> StartGame
Player --> SubmitGuess
```

**Use case preconditions and outcomes:**

- `/techdle`: Starts a new game or resets an existing one with a new tech word.
- `/guess`: Requires an active, unfinished game. Valid guesses produce letter feedback and update the remaining attempts. The player wins by guessing correctly or loses after six unsuccessful valid guesses.

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles slash commands; and `src/game/` contains the game logic and storage.
