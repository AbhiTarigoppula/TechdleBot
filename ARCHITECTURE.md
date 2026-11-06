# Abhi - Use Case Diagram

```mermaid
usecase-beta
direction TB

actor Player

systemBoundary "Techdle slash-command feature"
  StartGame("Start or restart a game with /techdle")
  SubmitGuess("Submit a guess with /guess")
  SeeResult("Receive colored feedback, attempts left, or win/loss result")
  InvalidGuess("Get an error when the guess is not five letters")
end

Player --> StartGame
Player --> SubmitGuess
SubmitGuess ..> : include SeeResult
InvalidGuess ..> : extend SubmitGuess
```

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
