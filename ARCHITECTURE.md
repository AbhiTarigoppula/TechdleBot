# Abhi - Use Case Diagram

```usecase-beta
direction TB

actor Player

systemBoundary "Techdle slash-command feature"
  StartGame("Start or restart a game with /techdle")
  SubmitGuess("Submit a five-letter guess with /guess")
end

Player --> StartGame
Player --> SubmitGuess
```

The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
