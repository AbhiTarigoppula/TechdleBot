## Slash-Command Game

A player starts a fresh Techdle game with `/techdle`. The bot saves that game using the player’s Discord ID. When the player submits `/guess {word}`, the bot loads that player’s game, checks and scores the guess, saves accepted guesses, and privately replies with the colored feedback and game result.

### Command flow

```mermaid
flowchart TD
    Player[Player in Discord] --> StartCommand["/techdle"]
    StartCommand --> StartGame[Create fresh game with six attempts]
    StartGame --> TechAnswer[Choose a tech answer]
    TechAnswer --> SaveNew[Save game under player's Discord ID]
    SaveNew --> StartReply[Privately confirm game started]

    Player --> GuessCommand["/guess {word}"]
    GuessCommand --> LoadGame[Load game using player's Discord ID]
    LoadGame --> Submit[Check and score the guess]
    Submit --> Accepted{Guess accepted?}
    Accepted -->|No| Error[Privately show error]
    Accepted -->|Yes| SaveGuess[Save updated game]
    SaveGuess --> Feedback[Privately show colored squares and game result]
```

### Saved game data

Each Discord user ID maps to that player's current game. Starting `/techdle` replaces that player's game and clears their guess history.

```mermaid
flowchart LR
    UserID["Discord user ID"] --> Game["Saved game"]
    Game --> Answer["answer"]
    Game --> Attempts["maxAttempts"]
    Game --> Guesses["guesses and letter feedback"]
    Game --> Status["playing, won, or lost"]
```

The slash-command handler is in `src/events/interactionCreate.js`. `src/game/start.js` creates fresh games, `src/game/game.js` processes guesses and determines game status, `src/game/feedback.js` scores and formats the colored squares, and `src/game/store.js` saves player games in `data/techdle-games.json`.
