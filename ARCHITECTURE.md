## Slash-Command Game Flow and Saved Player State

The slash-command game lets a Discord player start a Techdle game with `/techdle` and submit guesses with `/guess`. The bot uses the player’s Discord user ID to find that player’s saved game. Starting `/techdle` replaces that player’s current game with a new answer, an empty guess history, and six attempts.

### Game flow

Discord sends slash-command interactions to the interaction handler. The handler routes `/techdle` to the game-start logic and `/guess` to the guess-submission logic.

```mermaid
flowchart TD
    Player[Player in Discord] -->|Uses slash command| Handler[Interaction handler]
    Handler --> Command{Which command?}

    Command -->|/techdle| Start[startGame]
    Start -->|Selects answer| Answers[Tech answer list]
    Start -->|Creates new game| NewGame[Game with six attempts and no guesses]
    NewGame -->|Saves under player's Discord ID| Store[(JSON game store)]
    Start -->|Confirms game started| Reply[Private Discord reply]

    Command -->|/guess word| Load[Load game using player's Discord ID]
    Store -->|Player's current game| Load
    Load --> Submit[submitGuess]
    Submit --> Validate[Validate the guess]
    Validate --> Valid{Guess accepted?}

    Valid -->|No| Error[Return validation message]
    Error --> Reply

    Valid -->|Yes| Score[Score letters and update game status]
    Score --> Save[Save updated game]
    Save --> Store
    Score --> Result[Format squares and attempt or win/loss message]
    Result --> Reply
```

A rejected guess returns an error and does not change the saved game. An accepted guess is scored, added to the guess history, and saved before the bot replies. The reply shows colored squares and the remaining attempts, or a win/loss result when the game ends.

### Saved game data

The store keeps a separate game object for each Discord user ID. A new `/techdle` replaces only the requesting player’s game. Other players’ saved games remain in the file.

```mermaid
flowchart LR
    File[(data/techdle-games.json)] --> UserID["Discord user ID"]
    UserID --> Game["Player's game"]
    Game --> Answer["answer"]
    Game --> Attempts["maxAttempts"]
    Game --> History["guesses and feedback"]
    Game --> Status["playing, won, or lost"]
```

A saved entry has this shape:

```json
{
  "1555271532245295277": {
    "answer": "cloud",
    "maxAttempts": 6,
    "guesses": [
      {
        "guess": "crane",
        "feedback": ["absent", "absent", "present", "absent", "absent"]
      }
    ],
    "status": "playing"
  }
}
```

The JSON file lets the bot restore games after a restart, provided the file remains available. The current store loads the file into the running bot process and writes each update through a temporary file before replacing the saved file. It is designed for one running bot process. Multiple bot processes would each have their own in-memory copy of the games.

### Code responsibilities

- `src/events/interactionCreate.js` receives slash-command interactions, identifies the player, calls the game functions, saves accepted changes, and sends private replies.
- `src/game/start.js` selects a tech answer and creates a fresh game for that player.
- `src/game/game.js` validates and submits guesses, updates the guess history, and determines whether the player has won or lost.
- `src/game/feedback.js` compares guess letters with the answer and formats the colored-square feedback.
- `src/game/store.js` reads and writes the JSON file containing player game states.
- `src/commands/techdle.js` defines the `/techdle` and `/guess` slash-command options. `src/registerTechdle.js` registers those commands with Discord.
