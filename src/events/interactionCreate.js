import path from "path";
import { startGame } from "../game/start";
import { attemptsLeft, STATUS } from "../game/game";
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
    const result = startGame(interaction.user.id, client.techdleGames);
    const { game } = result;
    let content;
    if (game.status !== STATUS.PLAYING) {
      content = `Today's Techdle is already finished (${game.status}). A new puzzle unlocks at 00:00 UTC.`;
    } else if (!result.created) {
      content = `Your Techdle game is already active. You have ${attemptsLeft(game)} of 6 attempts left. Your progress has been kept.`;
    } else {
      content = "Techdle started! Find today's five-letter tech word in 6 attempts. Everyone gets the same daily word; the puzzle changes at 00:00 UTC.\nGuess submission is coming in the next command integration.";
    }
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
