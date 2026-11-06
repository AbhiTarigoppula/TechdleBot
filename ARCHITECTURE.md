# TechdleBot Use Case Diagram

```mermaid
usecase-beta
direction TB

actor Player

systemBoundary "TechdleBot"
  StartGame("Start or reset game with /techdle")
  SubmitGuess("Submit a five-letter guess with /guess")
  ViewFeedback("Receive guess feedback and game result")
end

Player --> StartGame
Player --> SubmitGuess
Player --> ViewFeedback
```

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
