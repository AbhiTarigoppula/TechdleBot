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
    Feedback("Receive letter feedback")
    GameResult("Receive win or loss result")
  end
  
  Player --> StartGame
  Player --> SubmitGuess
  
  StartGame ..> GenerateWord : include
  SubmitGuess ..> ValidateGuess : include
  GameResult ..> SubmitGuess : extend

```


The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
