import path from "path";
import { startGame } from "../game/start";
import { createGameStore } from "../game/store";

export async function handleStart(interaction, client) {
  if (!interaction.isChatInputCommand() || interaction.commandName !== "techdle") return;

  try {
    await interaction.deferReply({ ephemeral: true });
    // Lazy initialization keeps imports testable without creating files.
    if (!client.techdleGames) {
      client.techdleGames = createGameStore(
        process.env.TECHDLE_GAME_STORE || path.join(process.cwd(), "data", "techdle-games.json")
      );
    }
    startGame(interaction.user.id, client.techdleGames);
    const content = "Techdle started! Guess the five-letter tech word in 6 attempts. Every /techdle starts a new game and replaces your previous game.\nGuess submission is coming in the next command integration.";
    await interaction.editReply({ content });
  } catch (error) {
    console.error("Techdle start failed:", error.message);
    const response = { content: "Techdle could not start. Please try again later." };
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(response);
    } else {
      await interaction.reply({ ...response, ephemeral: true });
    }
  }
}

export default { name: "interactionCreate", execute: handleStart };
