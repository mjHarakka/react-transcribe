const API_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY

export async function transcribeAudio(uri: string): Promise<{ transcription: string; summary: string }> {
  const formData = new FormData()
  formData.append('file', { uri, type: 'audio/m4a', name: 'recording.m4a' } as any)
  formData.append('model', 'whisper-1')

  const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: formData,
  })
  const whisperData = await whisperRes.json()
  console.log('Whisper response:', JSON.stringify(whisperData))

  const transcription = whisperData.text

  const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: `Summarize this in 1-2 sentences:\n\n${transcription}` },
      ],
    }),
  })
  const gptData = await gptRes.json()
  console.log('GPT response:', JSON.stringify(gptData))

  const summary = gptData.choices[0].message.content

  return { transcription, summary }
}
