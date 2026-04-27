export const ELEVENLABS_VOICES = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', accent: 'American', style: 'Professional' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', accent: 'American', style: 'Casual' },
  { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte', accent: 'British', style: 'Elegant' },
  { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel', accent: 'British', style: 'Authoritative' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily', accent: 'British', style: 'Friendly' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', accent: 'Australian', style: 'Natural' },
]

export async function generateVoiceover(text: string, voiceId: string): Promise<string> {
  if (!process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY === 'placeholder') {
    return 'DEMO_AUDIO_URL'
  }
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  })
  if (!res.ok) throw new Error('ElevenLabs API error')
  const buffer = await res.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  return `data:audio/mpeg;base64,${base64}`
}
