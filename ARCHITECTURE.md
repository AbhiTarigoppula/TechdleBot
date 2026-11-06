# Abhi - Use Case Diagram

```mermaid
usecase-beta
direction LR

actor Player

systemBoundary "Techdle slash-command game"
  StartGame("Start or restart with /techdle")
  SubmitGuess("Submit a guess with /guess")
  CheckLength("Check that the guess has five letters")
  ShowFeedback("See colored feedback, attempts left, or win/loss")
  ShowError("See an error; use no attempt")
end

Player --> StartGame
Player --> SubmitGuess
SubmitGuess ..> : include CheckLength
ShowFeedback ..> : extend SubmitGuess
ShowError ..> : extend SubmitGuess
```

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
