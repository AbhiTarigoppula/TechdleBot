import { EmbedBuilder, userMention } from "discord.js";

const CHANNEL_NAME = process.env.CHANNEL_NAME;
const MEME_URL = process.env.MEME_URL || "";

const event = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === CHANNEL_NAME
    );

    /*
      TODO: Change getWelcomeMessage to getWelcomeMessageWithMeme to send a meme to welcome your user.
    */
    const welcomeMessage = await getWelcomeMessage(member.id);
    channel.send(welcomeMessage);
  },
};

const getWelcomeMessage = (userId) => {
  /*
    this function returns a welcome message.
    Play around with the code here and customise the welcome message.
  */
  return {
    content: `Welcome ${userMention(userId)},
    The FitnessGram Pacer Test is a multistage aerobic capacity test that...`,
  };
};

//
const getWelcomeMessageWithMeme = async (userId) => {
  /*
    this function returns a welcome message with a meme.
    Play around with the code here and customise the welcome message.

    TODO: Change this function to return different welcome message with a meme everytime a new user joins.
  */
  const meme = await getMeme();

  return {
    content: `Welcome ${userMention(userId)},
    Here's a meme for you to enjoy!`,
    embeds: [meme],
  };
};

const getMeme = async () => {
  /*
    this function returns a meme.

    TODO: change this function to return a different meme randomly everytime a new user joins.
  */

    randomNum = Math.floor(Math.random() * 3);
    let memeUrl = MEME_URL;
    if (randomNum === 1) {
      memeUrl = "https://www.reddit.com/media?url=https%3A%2F%2Fcf.preview.redd.it%2Ffavorite-ace-combat-8-meme-v0-t6vlvtu4jgvh1.jpeg%3Fwidth%3D1080%26format%3Dpjpg%26auto%3Dwebp%26s%3Dee13966cf089ccda651d4d7d62a3aee0bf93ee6a";
    } else if (randomNum === 2) {
      memeUrl = "https://www.reddit.com/media?url=https%3A%2F%2Fcf.preview.redd.it%2Ffavorite-ace-combat-8-meme-v0-dsel90aorgvh1.jpeg%3Fwidth%3D1200%26format%3Dpjpg%26auto%3Dwebp%26s%3Dd4939a436cec6dd718445951388ed8c990ab0a9a";
    }
    return new EmbedBuilder().setImage(memeUrl);
  //return new EmbedBuilder().setImage(MEME_URL);
};

export default event;
