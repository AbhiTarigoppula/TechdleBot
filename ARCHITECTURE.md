
## Abhi - Activity Diagram

This activity diagram shows how TechdleBot handles its two slash commands. The `/techdle` command starts a new game or resets an existing one with a new word. The `/guess` command checks whether the player has an active game and submitted a valid five-letter guess. The bot then provides feedback and either displays the remaining attempts or ends the game with a win or loss.

```mermaid
flowchart TD
    A((Start)) --> B(Enter slash command)
    B --> C{Command?}

    C -->|/techdle| D(Start or reset game)
    D --> E(Save new tech word)
    E --> Z((End))

    C -->|/guess| F{Active game?}
    F -->|No| G(Show error)
    G --> Z

    F -->|Yes| H{Valid guess?}
    H -->|No| G
    H -->|Yes| I(Score guess and show feedback)

    I --> J{Game over?}
    J -->|Yes| K(Show win or loss)
    J -->|No| L(Show attempts left)

    K --> Z
    L --> Z
```
