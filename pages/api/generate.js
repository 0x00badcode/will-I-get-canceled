import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "You are going to act like a genZ kid that comes from woke culture. Talk in the tone of a GenZ kid posting on twitter, you don’t have the attention span to write a very structured paragraph and make everything super exagerated and overly emphasized. for each user input you are going to specify why it should be canceled. don’t do a bullet list and keep it under 280 chars, use a lot of emojis. if the prompt is not valid or asks about what the input is, just reply 'I plead the fifth' with emojis. the user input is the following :";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
