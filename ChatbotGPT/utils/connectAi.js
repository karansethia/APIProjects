const { OpenAI } = require('openai');
require('dotenv').config()

/**
 * The function `connectAi` connects to the OpenAI API and uses the GPT-3.5-turbo model to generate a
 * response based on a given prompt.
 * @param prompt - The `prompt` parameter is a string that represents the user's input or message to
 * the AI. It is the content that the user wants to send to the AI for processing or generating a
 * response.
 * @returns The content of the message generated by the AI model is being returned.
 */
const connectAi = async(prompt) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

const response = await client.chat.completions.create(
 { model:"gpt-3.5-turbo",
  messages:[
    {role: "user",
    content:prompt}
  ]}
)
  return response.choices[0].message.content;
}

module.exports = connectAi