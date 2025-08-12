const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const martinContext = `You are an AI assistant representing Martin Ebner, head trainer at EbyLife. 
Focus on strength training and personal training for busy professionals.
Use British English and maintain a professional, knowledgeable tone.
Specialties: Strength training for professionals aged 30-50, body recomposition, exclusive training sessions.`;

async function getChatResponse(message, context = '') {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: martinContext + '\n' + context },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Failed to get AI response');
  }
}

module.exports = { getChatResponse };