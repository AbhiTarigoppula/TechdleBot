import { REST, Routes, SlashCommandBuilder } from "discord.js";

// Run explicitly for your private test server. POST creates/updates only this
// named command and preserves any other commands registered by teammates.
async function register() {
  const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;
  if (!TOKEN || !CLIENT_ID || !GUILD_ID) {
    throw new Error("Set TOKEN, CLIENT_ID and GUILD_ID in your .env file first.");
  }
  const command = new SlashCommandBuilder()
    .setName("techdle")
    .setDescription("Start a new Techdle game with a random tech word");
  const rest = new REST({ version: "10" }).setToken(TOKEN);
  await rest.post(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: command.toJSON(),
  });
  console.log("Registered /techdle in your test server.");
}

register().catch(error => {
  console.error("Could not register /techdle:", error.message);
  process.exitCode = 1;
});
