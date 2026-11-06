
# Abhi - Use Case Diagram

The use case diagram shows how a Discord player interacts with TechdleBot through its two slash commands. Players can start or reset a game with `/techdle` and submit guesses with `/guess`. A game must exist before a player can submit a guess.

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

## Techdle Gameplay Activity Diagram

This activity diagram shows how TechdleBot processes the two slash commands. The bot stores one game per Discord user, checks guesses, and returns feedback until the player wins or uses all six attempts.

```mermaid
flowchart TD
    A([Player enters slash command])
    B{Which command?}

    C[Start new game]
    D[Generate random tech word]
    E[Save game for player]
    F[Confirm game started]

    G{Game exists?}
    H[Ask player to start a game]
    I{Game still active?}
    J[Show game already finished]
    K{Guess has five letters?}
    L[Show invalid guess error]
    M[Score guess and save attempt]
    N[Display letter feedback]
    O{Correct guess?}
    P[Display win result]
    Q{Six attempts used?}
    R[Display loss result]
    S[Show remaining attempts]
    T([Wait for next command])

    A --> B
    B -->|/techdle| C
    C --> D --> E --> F --> T

    B -->|/guess| G
    G -->|No| H --> T
    G -->|Yes| I
    I -->|No| J --> T
    I -->|Yes| K
    K -->|No| L --> T
    K -->|Yes| M --> N --> O
    O -->|Yes| P --> T
    O -->|No| Q
    Q -->|Yes| R --> T
    Q -->|No| S --> T
```

## Related Code

- `src/commands/techdle.js` defines the `/techdle` and `/guess` slash commands.
- `src/events/interactionCreate.js` processes player commands and sends Discord responses.
- `src/game/start.js` creates new games and replaces existing games.
- `src/game/game.js` tracks guesses, attempts, and win/loss status.
- `src/game/validate.js` validates five-letter guesses.
- `src/game/feedback.js` generates letter feedback.
- `src/game/store.js` saves game state in a JSON file.
- `src/game/words.js` provides the possible tech-word answers.
