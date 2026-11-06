
# TechdleBot Use Case Diagram

```mermaid
usecase-beta
direction TB

actor Player

systemBoundary "TechdleBot"
  StartGame("Start or reset game with /techdle")
  SubmitGuess("Submit a word guess with /guess")
  GenerateWord("Generate a random five-letter tech word")
  ValidateGuess("Validate five-letter guess")
end

Player --> StartGame
Player --> SubmitGuess

StartGame ..> : include GenerateWord
SubmitGuess ..> : include ValidateGuess
```

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
