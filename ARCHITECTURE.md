# TechdleBot Use Case Diagram

```mermaid
flowchart LR
    Player["🧍 Player"]

    subgraph Bot["TechdleBot"]
        direction LR

        Start(["Start or Reset Game<br/>/techdle"])
        Guess(["Submit Word Guess<br/>/guess"])

        Generate(["Generate New<br/>Five-Letter Tech Word"])
        Validate(["Validate Guess"])
        Feedback(["Display Letter Feedback"])
        Result(["Display Win / Loss Result"])
    end

    Player --- Start
    Player --- Guess

    Start -.->|«include»| Generate
    Guess -.->|«include»| Validate

    Validate -.->|valid guess| Feedback
    Feedback -.->|game ends| Result

    style Bot fill:none,stroke:#64748b,stroke-width:2px
    style Start fill:#dbeafe,stroke:#4778ad,color:#17365d
    style Guess fill:#dbeafe,stroke:#4778ad,color:#17365d
    style Generate fill:#f1f5f9,stroke:#64748b,color:#334155
    style Validate fill:#f1f5f9,stroke:#64748b,color:#334155
    style Feedback fill:#f1f5f9,stroke:#64748b,color:#334155
    style Result fill:#f1f5f9,stroke:#64748b,color:#334155
```


The command definitions are in `src/commands/techdle.js`; `src/events/interactionCreate.js` handles the commands; and `src/game/` contains the game rules and storage.
