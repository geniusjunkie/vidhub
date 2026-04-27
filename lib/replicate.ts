export async function generateImage(prompt: string): Promise<string> {
  if (!process.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN === 'placeholder') {
    return `https://ui-avatars.com/api/?name=AI+Image&background=3b82f6&color=fff&size=512`
  }
  const res = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
      Prefer: 'wait',
    },
    body: JSON.stringify({ input: { prompt, num_outputs: 1, aspect_ratio: '9:16' } }),
  })
  const data = await res.json()
  return data.output?.[0] ?? ''
}

export async function generateVideo(prompt: string): Promise<string> {
  if (!process.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN === 'placeholder') {
    return 'DEMO_VIDEO_URL'
  }
  const res = await fetch('https://api.replicate.com/v1/models/minimax/video-01/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: { prompt } }),
  })
  const data = await res.json()
  return data.id ?? ''
}
