import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? 'placeholder',
})

export async function generateScript(topic: string, tone: string, duration: string) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'placeholder') {
    return `[DEMO] Here is a ${duration} ${tone} script about "${topic}":\n\nHook: Did you know that ${topic} is changing everything?\n\nMain points:\n1. First key insight about ${topic}\n2. Why this matters to your audience\n3. Actionable takeaway\n\nCTA: Follow for more content like this!`
  }
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `You are an expert short-form video scriptwriter. Write engaging ${tone} scripts optimized for ${duration} videos.` },
      { role: 'user', content: `Write a complete short-form video script about: ${topic}. Include a hook, main points, and CTA.` },
    ],
  })
  return res.choices[0].message.content ?? ''
}

export async function generateIdeas(niche: string, count: number) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'placeholder') {
    return Array.from({ length: count }, (_, i) => ({
      title: `${niche} Idea #${i + 1}`,
      hook: `Did you know this about ${niche}?`,
      angle: 'Educational / Trending',
    }))
  }
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a viral content strategist. Return JSON array only.' },
      { role: 'user', content: `Generate ${count} viral short-form video ideas for the "${niche}" niche. Return as JSON array with fields: title, hook, angle.` },
    ],
    response_format: { type: 'json_object' },
  })
  const data = JSON.parse(res.choices[0].message.content ?? '{"ideas":[]}')
  return data.ideas ?? []
}

export async function transcribeAudio(audioUrl: string) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'placeholder') {
    return '[DEMO] This is where your transcription would appear. Connect your OpenAI API key to enable real transcription.'
  }
  return '[Transcription requires audio file upload — connect OpenAI Whisper]'
}
